// src/lib/api/auth.ts
import api from "./axios";

export type LoginResponse = {
  token: string;
  user?: unknown;
};

export const login = async (email: string, senha: string) => {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, senha });
  return data;
};

export const register = async (payload: { nome: string; email: string; senha: string; dataNascimento?: string }) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const verifyEmail = async (payload: { email: string; codigo: string }) => {
  const { data } = await api.post("/auth/verify-email", payload);
  return data;
};

export const recuperarSenha = async (payload: { email: string }) => {
  const { data } = await api.post("/auth/recuperar-senha", payload);
  return data;
};

export const verificarCodigo = async (payload: { email: string; codigo: string }) => {
  const { data } = await api.post("/auth/verificar-codigo", payload);
  return data;
};

export const redefinirSenha = async (payload: { email: string; codigo: string; novaSenha: string }) => {
  const { data } = await api.post("/auth/redefinir-senha", payload);
  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete("/auth/delete-account");
  return data;
};
