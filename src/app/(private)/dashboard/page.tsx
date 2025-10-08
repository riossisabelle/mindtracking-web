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
    <div className="ml-0 md:ml-37.5 h-screen overflow-y-auto">
      <div className="ml-10 h-full flex flex-col">
        <div className="flex-shrink-0">
          <h1 className="text-[32px] font-semibold my-5">
            Bem Vindo, [Nome do Usuário]!
          </h1>
          <p className="text-[22px] font-semibold mb-6">
            Seu resumo de saúde mental esta semana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[98%]">
          <QuestionarioCard respondidos={42} respondeuHoje={true} />
          <EstadoEmocionalCard nota={2.1} />
          <RecomendacoesCard recomendacao="Seus diálogos têm foco em ansiedade. Experimente nossa meditação guiada!" />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[98%] mt-6 auto-rows-fr mb-4">
          <GraficoCard />
          <DiarioEmocionalCard />
          <div className="flex flex-col gap-6">
            <CorrelacaoCard />
            <AthenaCard />            
          </div>
        </div>
      </div>
    </div>
  );
}
