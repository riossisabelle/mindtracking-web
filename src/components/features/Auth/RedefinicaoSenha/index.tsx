"use client";

import { useState } from "react";
import ForgotPasswordModal from "./VerificacaoEmail";
import VerifyCodeModal from "./VerificacaoCodigo";
import ResetPasswordModal from "./AtualizacaoSenha";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Callback opcional para quando a redefinição for bem-sucedida
}

export default function RedefinicaoSenhaFlow({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [currentStep, setCurrentStep] = useState<"email" | "code" | "password">(
    "email",
  );
  const [userEmail, setUserEmail] = useState("");

  const handleEmailSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentStep("code");
  };

  const handleCodeSuccess = (code: string) => {
    setCurrentStep("password");
  };

  const handlePasswordSuccess = () => {
    onSuccess?.(); // Chama callback opcional
    handleClose(); // Fecha o fluxo
  };

  const handleClose = () => {
    setCurrentStep("email");
    setUserEmail("");
    onClose();
  };

  const handleBackToEmail = () => {
    setCurrentStep("email");
    setUserEmail("");
  };

  const handleBackToCode = () => {
    setCurrentStep("code");
  };

  return (
    <>
      {/* Modal de Verificação de Email */}
      <ForgotPasswordModal
        isOpen={isOpen && currentStep === "email"}
        onClose={handleClose}
        onSuccess={handleEmailSuccess}
      />

      {/* Modal de Verificação de Código */}
      <VerifyCodeModal
        isOpen={isOpen && currentStep === "code"}
        onClose={handleBackToEmail}
        onSuccess={handleCodeSuccess}
        email={userEmail}
      />

      {/* Modal de Redefinição de Senha */}
      <ResetPasswordModal
        isOpen={isOpen && currentStep === "password"}
        onClose={handleBackToCode}
        onSuccess={handlePasswordSuccess}
        email={userEmail}
      />
    </>
  );
}
