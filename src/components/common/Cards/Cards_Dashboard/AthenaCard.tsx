"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function ConverseAthenaCard() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-slate-800";

  return (
    <BaseCard>
      <div className="flex flex-col justify-between h-full">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-3">
          <h1 className={`text-[20px] font-semibold ${textColor}`}>
            Converse com a Athena
          </h1>
          <Image
            src={
              theme === "dark"
                ? "/images/icons/IconeAthenaChat.svg"
                : "/images/icons/IconeAthenaChat-black.svg"
            }
            alt="Ícone Athena"
            width={32}
            height={32}
          />
        </div>

        {/* Descrição */}
        <p className={`text-[15px] font-semibold font-inter mb-6 ${textColor}`}>
          Fale livremente sobre como está se sentindo, Athena está aqui para
          ouvir e apoiar você.
        </p>

        {/* Botão */}
        <a href="/AthenaChat">
            <button className={`
                mb-4 w-full h-[50px]
                ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }
                font-bold text-[16px]  rounded-3xl border-4 border-transparent transition-all duration-200 cursor-pointer
               disabled:opacity-60 disabled:cursor-not-allowed
               active:scale-[0.98] active:brightness-95 active:border-blue-700
               active:drop-shadow-[0_0_15px_#0C4A6E]
             `}>
            Comece Agora
          </button>
        </a>
      </div>
    </BaseCard>
  );
}
