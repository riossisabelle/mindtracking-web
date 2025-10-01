// src/lib/api/chat.ts
import api from "./axios";

export const sendChat = async (payload: { message: string; context?: unknown }) => {
  // endpoint conforme doc: /api/chat (Authorization required)
  const { data } = await api.post("/api/chat", payload);
  return data;
};
