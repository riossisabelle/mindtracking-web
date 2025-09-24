"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function EstadoEmocionalCard() {
    const { theme } = useTheme();
  return (
    <BaseCard>
        <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-semibold">Estado Emocional Médio</h1>
            <Image
              src={
                theme === "dark"
                  ? "/images/icons/IconeGrafico.svg"
                  : "/images/icons/Logo-slate-900.svg"
              }
              alt="Logo"
              width={54}
              height={51}
              className="w-9 h-auto"
            />  
        </div>
        <p className="mt-2 text-[16px] font-medium">Complete uma jornada de 7 questionários para poder visualizar sua nota</p>
    </BaseCard>
  );
}
