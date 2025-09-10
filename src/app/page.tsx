"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/Sidebar";
import ForgotPasswordModal from "../components/features/Auth/RedefinicaoSenha/VerificacaoEmail";

export default function Home() {
  const { theme } = useTheme(); // Obtém o tema atual do contexto
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalSuccess = () => {
    console.log("Modal de sucesso foi chamado!");
    setIsModalOpen(false);
    // Aqui você pode abrir o modal 2 se quiser
  };

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Abrir Modal de Verificação de Email
        </button>
      </div>

      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
