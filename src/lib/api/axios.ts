// src/lib/api/axios.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "https://mindtracking-api.onrender.com/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// helper para setar/remover Authorization header
export const setAuthToken = (token?: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// ao carregar no client, tenta reaplicar token salvo
if (typeof window !== "undefined") {
  const token = localStorage.getItem("mt_token");
  if (token) setAuthToken(token);
}

// interceptor para tratar 401 (ex.: token expirado)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (typeof window !== "undefined" && status === 401) {
      // limpeza local simples; você pode personalizar (ex.: refresh token)
      localStorage.removeItem("mt_token");
      setAuthToken(null);
      // redireciona para login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
