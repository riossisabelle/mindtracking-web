"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function CorrelacoesCard() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-slate-800";

  return (
    <BaseCard>
      <div className="flex flex-col ">
        {/* Título */}
        <h1 className={`text-[20px] font-semibold mb-4 ${textColor}`}>
          Correlações detectadas:
        </h1>

        {/* Lista de correlações */}
        <div
          className={`space-y-4 text-[15px] font-semibold font-inter mb-5 ${textColor}`}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/images/icons/thumbs-up-green.svg"
              alt="Ícone positivo"
              width={24}
              height={24}
            />
            <span> Dias com 7h+ de sono: 4 dias</span>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/icons/thumbs-down-red.svg"
              alt="Ícone negativo"
              width={24}
              height={24}
            />
            <span> Dias sem exercício: 9 dias</span>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/icons/thumbs-up-green.svg"
              alt="Ícone positivo"
              width={24}
              height={24}
            />
            <span> Dias com alimentação saudável: 7 dias</span>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
