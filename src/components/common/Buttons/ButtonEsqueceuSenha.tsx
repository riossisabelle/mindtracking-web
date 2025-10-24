"use client";

import { useState } from "react";
import RedefinicaoSenhaFlow from "../../features/Auth/RedefinicaoSenha";

interface Props {
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export default function ButtonEsqueceuSenha({
  className = "",
  children = "Redefinir Senha",
  onSuccess,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center font-bold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] active:brightness-95 ${className}`}
      >
        {children}
      </button>

      <RedefinicaoSenhaFlow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}
