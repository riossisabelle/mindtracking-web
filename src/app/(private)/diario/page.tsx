"use client";

import React, { useState, useEffect } from "react";
import { getDiarios } from "@/lib/api/diario";
import Image from "next/image";
import { useTheme } from "../../../contexts/ThemeContext";
import Sidebar from "@/components/layout/Sidebar";
import ModalAnalise from "@/components/common/Modals/Diario/ModalAnalise";

interface Analysis {
  message: string;
  emotion: string;
  intensity: string;
  athena: string;
}

interface Card {
  id: string | number;
  title: string;
  date: string;
  description: string;
  analysis?: Analysis;
}

export default function Diario() {
  const { theme } = useTheme();
  const formatDate = (iso?: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null
  );
  const [cards, setCards] = useState<Card[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const resp = await getDiarios();

        // normaliza diferentes formatos que o backend pode retornar
        // resp pode ser um array, ou { entradas: [...] }, ou { data: [...] }
        let entradas: any[] = [];
        if (Array.isArray(resp)) entradas = resp as any[];
        else if ((resp as any)?.entradas) entradas = (resp as any).entradas;
        else if ((resp as any)?.data) entradas = (resp as any).data;

        const mapped = entradas.map((e: any) => {
          // backend real field names
          const titulo = e.titulo ?? e.title ?? "Diário";
          const texto = e.texto ?? e.text ?? e.descricao ?? e.mensagem ?? "";
          const data_hora = e.data_hora ?? e.createdAt ?? e.date ?? null;

          // analysis fields from backend
          const emocao = (e.emocao_predominante ?? e.emocao) || null;
          const intensidade = (e.intensidade_emocional ?? e.intensidade) || null;
          const comentarioAthena = (e.comentario_athena ?? e.comentario ?? e.athena) || null;

          const hasAnalysis = Boolean(comentarioAthena || emocao || intensidade);

          const analysis = hasAnalysis
            ? {
                message: texto,
                emotion: emocao ?? "",
                intensity: intensidade ?? "",
                athena: comentarioAthena ?? "",
              }
            : null;

          return {
            id: e.id ?? e._id ?? Math.random(),
            title: titulo,
            date: data_hora ? formatDate(data_hora) : "",
            description: texto,
            analysis,
          } as Card;
        });
  console.log("getDiarios resp:", resp);
  console.log("mapped entradas:", mapped);

  setCards(mapped as Card[]);
        setFetchError(null);
      } catch (error) {
        console.error("Erro ao buscar os registros do diário:", error);
        setFetchError(String(error ?? "Erro desconhecido"));
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="h-screen overflow-y-auto lg:ml-37.5 md:mt-20 mt-25 lg:mt-0">
      <Sidebar />

      <div className="w-full p-6 md:p-10">
        <h1
          className={`text-2xl font-bold mb-10 lg:mb-10 font-inter ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } transition-all duration-300 ease-in-out`}
        >
          Diário Emocional
        </h1>

        <div
          className={`rounded-xl p-6 ${
            theme === "dark"
              ? "border-2 border-blue-600 bg-slate-900"
              : "bg-white border-2 border-black"
          } transition-all duration-300 ease-in-out`}
        >
          {loading ? (
            <p className="text-center font-inter">Carregando...</p>
          ) : cards.length === 0 ? (
            <p className="text-center font-inter">Nenhum registro encontrado.</p>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">Registros encontrados: <span className="font-medium text-white/90">{cards.length}</span></div>
                {fetchError && <div className="text-sm text-red-400">Erro: {fetchError}</div>}
              </div>

              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 overflow-y-auto max-h-[720px]">
                {cards.map((card) => (
                  <div key={card.id} className="p-4">
                    <div
                      className={`w-full rounded-lg p-4 border-2 transition-all duration-300 ease-in-out ${
                        theme === "dark"
                          ? "bg-slate-800 text-gray-200 border-blue-600"
                          : "bg-slate-50 text-gray-800 border-blue-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h2 className="font-inter font-bold text-base md:text-lg">{card.title}</h2>
                          <div className="text-xs text-gray-400 mt-1"></div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm text-gray-400 font-inter">{card.date}</span>
                          <span className={`mt-2 px-2 py-1 rounded text-xs ${card.analysis ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white/80'}`}>
                            {card.analysis ? 'Análise disponível' : 'Sem análise'}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm mb-4 font-inter leading-relaxed text-left whitespace-pre-line">
                        {card.description}
                      </p>

                      {card.analysis && (
                        <div className="mb-2 text-sm text-gray-200">
                          <div className="text-xs text-gray-300">Emoção: <span className="font-medium">{card.analysis.emotion || '—'}</span></div>
                          <div className="text-xs text-gray-300">Intensidade: <span className="font-medium">{card.analysis.intensity || '—'}</span></div>
                          <div className="text-xs text-gray-300">Athena: <span className="font-medium">{card.analysis.athena ? card.analysis.athena.slice(0,80) + (card.analysis.athena.length>80?'...':'') : '—'}</span></div>
                        </div>
                      )}

                      {card.analysis && (
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              if (card.analysis) {
                                setSelectedAnalysis({
                                  message: card.analysis.message ?? "",
                                  emotion: card.analysis.emotion ?? "",
                                  intensity: card.analysis.intensity ?? "",
                                  athena: card.analysis.athena ?? "",
                                });
                              }
                            }}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition duration-200 ease-in-out"
                            aria-label={`Ver análise de ${card.title}`}
                          >
                            <Image src="/images/icons/lupa.svg" alt="Lupa" width={16} height={16} />
                            <span>Ver Análise</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalAnalise
        isOpen={!!selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
        analysis={selectedAnalysis}
      />
    </div>
  );
}


//codigo certo