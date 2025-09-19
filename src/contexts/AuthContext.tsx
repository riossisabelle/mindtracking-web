// src/contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "@/lib/api/auth";
import { setAuthToken } from "@/lib/api/axios";

type AuthContextType = {
  token: string | null;
  user: unknown | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // restore token on mount
    const t = typeof window !== "undefined" ? localStorage.getItem("mt_token") : null;
    if (t) {
      setToken(t);
      setAuthToken(t);
      // opcional: buscar perfil do usuário se existir endpoint /auth/me
      // setUser(...)
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      const res = await authService.login(email, senha);
      const t = res.token;
      localStorage.setItem("mt_token", t);
      setAuthToken(t);
      setToken(t);
      setUser(res.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("mt_token");
    setAuthToken(null);
    setToken(null);
    setUser(null);
    // redirecionar se quiser: window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
