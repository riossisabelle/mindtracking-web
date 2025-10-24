"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";
import { useState, useEffect } from "react";
import { corelacoes } from "@/lib/api/questionario";
import { setAuthToken } from "@/lib/api/axios";

interface Correlacao {
  total_ocorrencias: number;
  // agora usamos pontuacao (1-4) quando disponível
  pontuacao?: number | string;
  texto_alternativa: string;
  texto_pergunta?: string;
  icone: string;
}

export default function CorrelacoesCard() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-slate-800";

  const [correlacoes, setCorrelacoes] = useState<Correlacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para processar as correlações da API
  const processarCorrelacoes = (data: any): Correlacao[] => {
    const correlacoesList = data?.correlacoes || [];
    
    // Ordenar por total_ocorrencias em ordem decrescente
    const correlacoesOrdenadas = [...correlacoesList].sort((a, b) => {
      return parseInt(b.total_ocorrencias) - parseInt(a.total_ocorrencias);
    });
    
    // Mapear pontuação para ícone: 1 or 2 => thumbs-down, 3 or 4 => thumbs-up
    const obterIcone = (pontuacao?: number | string): string => {
      const p = typeof pontuacao === 'number' ? pontuacao : parseInt(String(pontuacao || ''), 10);
      if (p === 1 || p === 2) {
        return "/images/icons/thumbs-down-red.svg";
      } else if (p === 3 || p === 4) {
        return "/images/icons/thumbs-up-green.svg";
      } else {
        return "/images/icons/thumbs-up-green.svg"; // Default
      }
    };
    
    // Processar dados
    return correlacoesOrdenadas.map(correlacao => {
      // tente extrair pontuacao numérica; alguns retornos podem usar 'classificacao' em vez de 'pontuacao'
      const rawPont = correlacao.pontuacao ?? correlacao.classificacao ?? '';
      const pontNum = rawPont !== '' ? (isNaN(Number(rawPont)) ? undefined : Number(rawPont)) : undefined;
      return {
        pontuacao: pontNum ?? rawPont,
        texto_alternativa: correlacao.texto_alternativa || '',
        texto_pergunta: correlacao.texto_pergunta || '',
        icone: obterIcone(pontNum ?? rawPont)
      } as Correlacao;
    });
  };

  useEffect(() => {
    const carregarCorrelacoes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Configurar token JWT
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("mt_token");
          if (token) {
            setAuthToken(token);
          }
        }

        // Buscar ID do usuário
        const userStr = localStorage.getItem("mt_user");
        if (!userStr) {
          throw new Error("Usuário não encontrado no localStorage");
        }
        
        const user = JSON.parse(userStr);
        const userId = user.id || user.user_id || user.usuario_id;
        
        if (!userId) {
          throw new Error("ID do usuário não encontrado");
        }

        // Buscar correlações da API
        const correlacaoData = await corelacoes(userId);
        
        if (!correlacaoData.success) {
          throw new Error(correlacaoData.message || "Erro ao carregar correlações");
        }

        // Processar dados
        const correlacaoProcessadas = processarCorrelacoes(correlacaoData);
        setCorrelacoes(correlacaoProcessadas);

      } catch (error: any) {
        console.error("Erro ao carregar correlações:", error);
        setError(error.message || "Erro ao carregar correlações");
      } finally {
        setLoading(false);
      }
    };

    carregarCorrelacoes();
  }, []);

  if (loading) {
    return (
      <BaseCard>
        <div className="flex items-center justify-center h-full min-h-[150px]">
          <div className={`text-lg ${textColor}`}>Carregando...</div>
        </div>
      </BaseCard>
    );
  }

  if (error) {
    return (
      <BaseCard>
        <div className="flex items-center justify-center h-full min-h-[150px]">
          <div className={`text-sm ${textColor}`}>
            Erro: {error}
          </div>
        </div>
      </BaseCard>
    );
  }

  if (correlacoes.length === 0) {
    return (
      <BaseCard>
        <div className="flex flex-col">
          <h1 className={`text-[20px] font-semibold mb-4 ${textColor}`}>
            Respostas frequentes:
          </h1>
          <div className={`text-sm ${textColor} text-center py-8`}>
            Nenhuma correlação encontrada ainda.
            <br />
            Responda mais questionários para ver padrões!
          </div>
        </div>
      </BaseCard>
    );
  }

  return (
    <BaseCard>
      <div className="flex flex-col">
        {/* Título */}
        <h1 className={`text-[20px] font-semibold mb-4 ${textColor}`}>
          Respostas frequentes:
        </h1>

        {/* Lista de correlações */}
        <div
          className={`space-y-4 text-[16px] font-semibold font-inter mb-5 mt-2 ${textColor}`}
        >
          {correlacoes.map((correlacao, index) => (
            <div key={index} className="flex flex-col gap-2">
              {correlacao.texto_pergunta && (
                <div className={`text-[18px] font-semibold ${textColor}`}>{correlacao.texto_pergunta}</div>
              )}
              <div className="flex items-center gap-3 text-[16px] font-light">
                <Image
                  src={correlacao.icone}
                  alt={`Ícone ${correlacao.pontuacao ?? correlacao.texto_alternativa}`}
                  width={20}
                  height={20}
                />
                <span>
                  {correlacao.texto_alternativa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}