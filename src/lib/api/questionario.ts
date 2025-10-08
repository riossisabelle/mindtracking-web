// src/lib/api/questionario.ts
import api from "./axios";

export const getPerguntas = async (diario = false) => {
  // chama rota específica para perguntas do diário quando `diario` for true
  const url = diario ? "/questionario/diario/perguntas" : "/questionario/perguntas";
  const { data } = await api.get(url);
  return data;
};

export const responderQuestionario = async (payload: unknown) => {
  const { data } = await api.post("/questionario/responder", payload);
  return data;
};

export const pontuacao = async (usuarioId: string) => {
  const { data } = await api.get(`/questionario/pontuacao/${usuarioId}`);
  return data;
};

export const historico = async (usuarioId: string) => {
  const { data } = await api.get(`/questionario/historico/${usuarioId}`);
  return data;
};

export const estatisticas = async (usuarioId: string) => {
  const { data } = await api.get(`/questionario/estatisticas/${usuarioId}`);
  return data;
};

export const verificarDiario = async (usuarioId: string) => {
  const { data } = await api.get(`/questionario/diario/verificar/${usuarioId}`);
  return data;
};

export const responderDiario = async (payload: unknown) => {
  const { data } = await api.post("/questionario/diario/responder", payload);
  return data;
};
