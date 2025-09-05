"use client";

import { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import Sidebar from "./components/Sidebar";
import ForgotPasswordModal from "./components/Auth/RedefiniçãoSenha/VerificacaoEmail";

export default function Home() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalSuccess = () => {
    console.log("Modal de sucesso foi chamado!");
    setIsModalOpen(false);
    // Aqui você pode abrir o modal 2 se quiser
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
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
