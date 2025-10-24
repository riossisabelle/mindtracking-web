"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";
import { pontuacao } from "@/lib/api/questionario";

interface PontuacaoResponse {
  success: boolean;
  nota: number;
  nivel: string;
  message: string;
}

interface EstadoEmocionalCardProps {
  usuarioId: string;
}

export default function EstadoEmocionalCard({
  usuarioId,
}: EstadoEmocionalCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mainText = isDark ? "text-white" : "text-slate-800";
  const secondaryText = isDark ? "text-white" : "text-slate-700";

  const [data, setData] = useState<PontuacaoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPontuacao() {
      setLoading(true);
      try {
        const response = await pontuacao(usuarioId);
        console.log("API Response:", response);
        setData(response);
      } catch (error) {
        console.error("Erro ao buscar pontuação:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    if (usuarioId) fetchPontuacao();
  }, [usuarioId]);

  if (loading) {
    return (
      <BaseCard>
        <p className={`mt-3 text-[15px] font-medium ${secondaryText}`}>
          Carregando...
        </p>
      </BaseCard>
    );
  }

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
          alt="Ícone gráfico"
          width={54}
          height={51}
          className="w-9 h-auto"
        />
      </div>

      {!data || !data.success ? (
        <p className={`mt-3 text-[15px] font-medium ${secondaryText}`}>
          Complete uma jornada de 7 questionários para poder visualizar sua nota
        </p>
      ) : (
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-[40px] font-semibold ${mainText}`}>
              {data.nota.toFixed(1)}
            </span>
            <span
              className="ml-1 text-yellow-500 text-2xl"
              role="img"
              aria-label="estrela"
            >
              ⭐
            </span>
          </div>
        </div>
      )}
    </BaseCard>
);
}