"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

interface RecomendacoesCardProps {
  recomendacao?: string | null;
}

export default function RecomendacoesCard({
  recomendacao = null,
}: RecomendacoesCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mainText = isDark ? "text-white" : "text-slate-800";
  const secondaryText = isDark ? "text-white" : "text-slate-800";

  return (
    <BaseCard>
      <div className="flex justify-between items-center">
        <h1 className={`text-[20px] font-semibold ${mainText}`}>
          Recomendação
        </h1>
        <Image
          src={
            isDark
              ? "/images/icons/IconeLampada.svg"
              : "/images/icons/IconeLampada-black.svg"
          }
          alt="Logo"
          width={54}
          height={51}
          className="w-9 h-auto"
        />
      </div>
      <p className={`mt-2 text-[15px] font-medium  ${secondaryText}`}>
        {recomendacao == null
          ? "Bem-vindo à MindTracking! Que tal começar conhecendo mais sobre como você está se sentindo hoje?"
          : recomendacao}
      </p>
    </BaseCard>
  );
}
