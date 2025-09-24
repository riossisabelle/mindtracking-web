"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function RecomendacoesCard() {
    const { theme } = useTheme();
  return (
    <BaseCard >
      <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-semibold">Recomendação</h1>
            <Image
              src={
                theme === "dark"
                  ? "/images/icons/IconeLampada.svg"
                  : "/images/icons/Logo-slate-900.svg"
              }
              alt="Logo"
              width={54}
              height={51}
              className="w-9 h-auto"
            />  
        </div>
        <p className="mt-2 text-[16px] font-medium">Bem-vindo à MindTracking! Que tal começar conhecendo mais sobre como você está se sentindo hoje?</p>
    </BaseCard>
  );
}
