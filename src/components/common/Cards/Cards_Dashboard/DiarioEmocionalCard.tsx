"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function DiarioEmocionalCard() {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "text-white" : "text-slate-800"; // ajuste principal

  return (
    <BaseCard>
      <div className="flex flex-col justify-between h-full">
        {/* Cabeçalho com ícone e título */}
        <div className="flex items-center gap-4">
          <Image
            src={
              theme === "dark"
                ? "/images/icons/IconeDiario.svg"
                : "/images/icons/IconeDiarioDark.svg"
            }
            alt="Ícone Diário"
            width={24}
            height={24}
            className="w-8 h-8"
          />
          <h1 className="text-[20px] font-semibold ">Seu Diário Emocional</h1>
        </div>

        {/* Conteúdo */}
        <div
          className={`mt-4 space-y-3 text-[15px] font-semibold font-inter ${textColor}`}
        >
          <p>
            Último diário registrado:{" "}
            <span>
              &ldquo;Não consegui dormir direito. Senti ansiedade e
              medo...&rdquo;
            </span>
          </p>
          <p>25/06 às 22h12</p>
          <p>
            <span className="font-semibold">Emoção predominante:</span>{" "}
            Ansiedade
          </p>
          <p>
            <span className="font-semibold">Intensidade emocional:</span> Alta
          </p>
          <p>
            <span className="font-semibold">Athena diz:</span>
            <br />
            &ldquo;Você parece sobrecarregado. Tente relaxar com uma
            meditação.&rdquo;
          </p>
        </div>

        {/* Botão */}
        <a href="/questionnaire">
          <button
            className={`
               my-6 w-full h-[50px]
               ${
                 theme === "dark"
                   ? "bg-blue-600 hover:bg-blue-500 text-white"
                   : "bg-blue-600 hover:bg-blue-500 text-white"
               }
               font-bold text-[16px] py-2 rounded-3xl border-4 border-transparent transition-all duration-200 cursor-pointer
               disabled:opacity-60 disabled:cursor-not-allowed
               active:scale-[0.98] active:brightness-95 active:border-blue-700
               active:drop-shadow-[0_0_15px_#0C4A6E]
             `}
          >
            Escrever no diário
          </button>
        </a>
      </div>
    </BaseCard>
  );
}
