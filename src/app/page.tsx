"use client";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/Sidebar";
import ForgotPasswordButton from "@/components/common/Buttons/ButtonEsqueceuSenha";

export default function Home() {
  const { theme } = useTheme(); // Obtém o tema atual do contexto


  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="text-center space-y-4">
        <Sidebar />
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Teste do Modal
        </h1>
        <ForgotPasswordButton />
      </div>
    </div>
  );
}
