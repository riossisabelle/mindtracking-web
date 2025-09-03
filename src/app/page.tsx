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
    <div></div>
  );
}
