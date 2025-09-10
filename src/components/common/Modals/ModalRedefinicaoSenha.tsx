"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { theme } = useTheme(); // Obtém o tema atual do contexto

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`${
          theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-black"
        } rounded-[12px] p-4 sm:p-6 md:p-8 relative
         max-h-[90vh] w-[90%] max-w-[1066px] h-auto
         min-h-[clamp(300px,60vh,400px)]
         sm:min-h-[clamp(350px,65vh,500px)]
         md:min-h-[clamp(400px,85vh,690px)]
         flex flex-col items-center justify-center`}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400"
        >
          <Image
            src={theme === "dark" ? "/images/icons/BotaoFechar-white.svg" : "/images/icons/BotaoFechar-black.svg"}
            alt="Fechar"
            width={20}
            height={20}
            className="w-12.5 h-12.5 cursor-pointer"
          />
        </button>

        {children}
      </div>
    </div>
  );
}
