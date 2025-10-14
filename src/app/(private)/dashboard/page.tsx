"use client";
import { useState, useEffect } from "react";
import QuestionarioCard from "@/components/common/Cards/Cards_Dashboard/QuestionarioCard";
import EstadoEmocionalCard from "@/components/common/Cards/Cards_Dashboard/EstadoEmocionalCard";
import RecomendacoesCard from "@/components/common/Cards/Cards_Dashboard/RecomendacoesCard";
import GraficoCard from "@/components/common/Cards/Cards_Dashboard/GraficoCard";
import DiarioEmocionalCard from "@/components/common/Cards/Cards_Dashboard/DiarioEmocionalCard";
import CorrelacaoCard from "@/components/common/Cards/Cards_Dashboard/CorrelacaoCard";
import AthenaCard from "@/components/common/Cards/Cards_Dashboard/AthenaCard";
import api from "@/lib/api/axios";
import { setAuthToken } from "@/lib/api/axios";

export default function Dashboard() {
  const [questionarioStatus, setQuestionarioStatus] = useState({
    respondeuHoje: false,
    respondidos: 0,
    loading: true,
  });
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // Configura token JWT
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("mt_token");
        if (token) setAuthToken(token);
      }

      // Obtém e armazena userId
      const userStr = localStorage.getItem("mt_user");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const id = user.id || user.user_id || user.usuario_id;
      if (id) setUsuarioId(id);

      // Verifica status dos questionários
      try {
        const respVerif = await api.get(`/questionario/diario/verificar/${id}`);
        const respEstat = await api.get(`/questionario/estatisticas/${id}`);
        setQuestionarioStatus({
          respondeuHoje: respVerif.data.ja_respondido || false,
          respondidos: respEstat.data.estatisticas?.total_questionarios || 0,
          loading: false,
        });
      } catch (error) {
        console.error("Erro ao verificar questionário:", error);
        setQuestionarioStatus({ respondeuHoje: false, respondidos: 0, loading: false });
      }
    };

    init();
  }, []);

  return (
    <div className="ml-0 lg:ml-37.5 min-h-0 h-screen">
      <div className="ml-o lg:ml-12.5 flex flex-col min-h-0 h-full">
        <div className="flex-shrink-0">
          <h2 className="text-[30px] font-semibold mb-2 mt-2">
            Seu resumo de saúde mental semanal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[98%] auto-rows-fr min-h-0">
          <QuestionarioCard
            respondidos={questionarioStatus.respondidos}
            respondeuHoje={questionarioStatus.respondeuHoje}
            loading={questionarioStatus.loading}
          />
          {/* Passa usuarioId em vez de valor fixo */}
          {usuarioId && <EstadoEmocionalCard usuarioId={usuarioId} />}
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