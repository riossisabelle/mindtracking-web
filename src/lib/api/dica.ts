// src/lib/api/dica.ts
import api from "./axios";

export const getDica = async () => {
  const { data } = await api.get("/api/dica");
  return data;
};

export const getQtdConversas = async () => {
  const { data } = await api.get("/api/diagnosticos");
  return data;
};
