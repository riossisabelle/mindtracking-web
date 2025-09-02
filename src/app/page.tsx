"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ForgotPasswordModal from "../components/Auth/Modal1";

export default function Home() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalSuccess = () => {
    console.log("Modal de sucesso foi chamado!");
    setIsModalOpen(false);
    // Aqui você pode abrir o modal 2 se quiser
  };
  
  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">🧠 MindTracking</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Teste do modal de recuperação de senha
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          🔓 Esqueci minha senha
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
