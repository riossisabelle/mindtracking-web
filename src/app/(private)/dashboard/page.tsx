"use client";
import { useTheme } from "@/contexts/ThemeContext";
import QuestionarioCard from "@/components/common/Cards/Cards_Dashboard/QuestionarioCard";
import EstadoEmocionalCard from "@/components/common/Cards/Cards_Dashboard/EstadoEmocionalCard";
import RecomendacoesCard from "@/components/common/Cards/Cards_Dashboard/RecomendacoesCard";
import GraficoCard from "@/components/common/Cards/Cards_Dashboard/GraficoCard";

export default function Dashboard() {
  const { theme } = useTheme();

  return (
    <div className="ml-0 md:ml-37.5">
      <div className="ml-10">
        <h1 className="text-[32px] font-semibold mb-6 mt-5">
          Bem Vindo, [Nome do Usuário]!
        </h1>
        <p className="text-[22px] font-semibold mb-6">
          Seu resumo de saúde mental esta semana
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[98%]">
          <QuestionarioCard />
          <EstadoEmocionalCard />
          <RecomendacoesCard />
        </div>
        <div>
          <GraficoCard />
        </div>
      </div>
    </div>
  );
}
