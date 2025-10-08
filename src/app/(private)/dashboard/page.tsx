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
    loading: true
  });

  useEffect(() => {
    const verificarQuestionario = async () => {
      try {
        // Aplica o token JWT antes de fazer as requisições
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("mt_token");
          if (token) {
            setAuthToken(token);
          }
        }

        // Busca o ID do usuário do localStorage
        const userStr = localStorage.getItem("mt_user");
        if (!userStr) return;
        
        const user = JSON.parse(userStr);
        const userId = user.id || user.user_id || user.usuario_id;
        
        if (!userId) return;

        // Chama a API para verificar se já respondeu hoje
        const verificarResponse = await api.get(`/questionario/diario/verificar/${userId}`);
        
        // Chama a API para obter estatísticas (total de questionários)
        const estatisticasResponse = await api.get(`/questionario/estatisticas/${userId}`);
        
        setQuestionarioStatus({
          respondeuHoje: verificarResponse.data.ja_respondido || false,
          respondidos: estatisticasResponse.data.estatisticas?.total_questionarios || 0,
          loading: false
        });
      } catch (error) {
        console.error("Erro ao verificar questionário:", error);
        // Em caso de erro, assume que não respondeu
        setQuestionarioStatus({
          respondeuHoje: false,
          respondidos: 0,
          loading: false
        });
      }
    };

    verificarQuestionario();
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
