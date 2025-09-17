"use client";
import { ReactNode } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-slate-800 text-white rounded-[12px] p-4 sm:p-6 md:p-8 relative 
        max-h-[90vh] 
        w-[90%] max-w-[1066px] 
        h-auto min-h-[400px] sm:min-h-[500px] md:min-h-[600px]
        flex flex-col items-center justify-center">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400"
        >
          <Image
            src="/images/icons/BotaoFechar.svg"
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
