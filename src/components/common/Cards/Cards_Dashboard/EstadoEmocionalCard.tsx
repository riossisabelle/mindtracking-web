"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

interface EstadoEmocionalCardProps {
  nota?: number | null;
}

export default function EstadoEmocionalCard({
  nota = null,
}: EstadoEmocionalCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mainText = isDark ? "text-white" : "text-slate-800";
  const secondaryText = isDark ? "text-white" : "text-slate-700";

  return (
    <BaseCard>
      <div className="flex justify-between items-center">
        <h1 className={`text-[20px] font-semibold ${mainText}`}>
          Estado Emocional Médio
        </h1>
        <Image
          src={
            isDark
              ? "/images/icons/IconeGrafico.svg"
              : "/images/icons/IconeGrafico-black.svg"
          }
          alt="Logo"
          width={54}
          height={51}
          className="w-9 h-auto"
        />
      </div>
      {nota == null ? (
        <p className={`mt-3 text-[15px] font-medium ${secondaryText}`}>
          Complete uma jornada de 7 questionários para poder visualizar sua nota
        </p>
      ) : (
        <div className="mt-3 flex items-center gap-2">
          <span className={`text-[40px] font-semibold ${mainText}`}>
            {Number(nota).toFixed(1)}
          </span>
          <span
            className="ml-1 text-yellow-500 text-2xl"
            role="img"
            aria-label="estrela"
          >
            ⭐
          </span>
        </div>
      )}
    </BaseCard>
  );
}
