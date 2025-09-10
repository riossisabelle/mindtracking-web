"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/Sidebar";
import ForgotPasswordModal from "../components/features/Auth/RedefinicaoSenha/VerificacaoEmail";
import VerifyCodeModal from "../components/features/Auth/RedefinicaoSenha/VerificacaoCodigo";

export default function Home() {
  const { theme } = useTheme(); // Obtém o tema atual do contexto
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [userEmail] = useState("");

  const handleEmailModalSuccess = () => {
    console.log("Modal de email foi chamado!");
    setIsEmailModalOpen(false);
    // Aqui você pode abrir o modal de código se quiser
  };

  const handleCodeModalSuccess = () => {
    console.log("Modal de código foi chamado!");
    setIsCodeModalOpen(false);
    // Aqui você pode abrir o próximo modal se quiser
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
        <div className="space-y-3">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Abrir Modal de Verificação de Email
          </button>
          
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Abrir Modal de Verificação de Código
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSuccess={handleEmailModalSuccess}
      />

      <VerifyCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onSuccess={handleCodeModalSuccess}
        email={userEmail || "teste@exemplo.com"}
      />
    </div>
  );
}
