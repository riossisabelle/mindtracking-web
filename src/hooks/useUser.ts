import { useState, useEffect } from 'react';
import { dadosUser } from '@/lib/api/auth';

export interface UserData {
  id?: number | string;
  nome?: string;
  email?: string;
  data_nascimento?: string | null;
  idade?: number | null;
  telefone?: string | null;
  genero?: string | null;
  fotoPerfil?: string | null;
}

export const useUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dadosUser();
      setUserData(response?.user ?? null);
    } catch (err) {
      console.error('Erro ao carregar dados do usuário:', err);
      setError('Erro ao carregar dados do usuário');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(prev => prev ? { ...prev, ...newData } : null);
  };

  const getUserInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase();
    const second = parts.length > 1 ? parts[1]?.charAt(0).toUpperCase() : "";
    return `${first}${second}`;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
    loading,
    error,
    fetchUserData,
    updateUserData,
    getUserInitials,
  };
};
