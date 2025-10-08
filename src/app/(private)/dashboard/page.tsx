"use client";
import QuestionarioCard from "@/components/common/Cards/Cards_Dashboard/QuestionarioCard";
import EstadoEmocionalCard from "@/components/common/Cards/Cards_Dashboard/EstadoEmocionalCard";
import RecomendacoesCard from "@/components/common/Cards/Cards_Dashboard/RecomendacoesCard";
import GraficoCard from "@/components/common/Cards/Cards_Dashboard/GraficoCard";
import DiarioEmocionalCard from "@/components/common/Cards/Cards_Dashboard/DiarioEmocionalCard";
import CorrelacaoCard from "@/components/common/Cards/Cards_Dashboard/CorrelacaoCard";
import AthenaCard from "@/components/common/Cards/Cards_Dashboard/AthenaCard";

export default function Dashboard() {
  return (
    <div className="ml-0 lg:ml-37.5 min-h-0 h-screen">
      <div className="ml-o lg:ml-12.5 flex flex-col min-h-0 h-full">
        <div className="flex-shrink-0">
          <h2 className="text-[30px] font-semibold mb-2 mt-2">
            Seu resumo de saúde mental semanal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[98%] auto-rows-fr min-h-0">
          <QuestionarioCard respondidos={42} respondeuHoje={false} />
          <EstadoEmocionalCard nota={2.1} />
          <RecomendacoesCard recomendacao="Seus diálogos têm foco em ansiedade. Experimente nossa meditação guiada!" />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[98%] my-4 auto-rows-fr min-h-0">
          <GraficoCard />
          <DiarioEmocionalCard />
          <div className="flex flex-col gap-4 min-h-0 flex-1">
            <CorrelacaoCard />
            <AthenaCard />
          </div>
        </div>
      </div>
    </div>
  );
}
