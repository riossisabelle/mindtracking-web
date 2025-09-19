// src/lib/api/dica.ts
import api from "./axios";

export const getDica = async () => {
  const { data } = await api.get("/api/dica");
  return data;
};
