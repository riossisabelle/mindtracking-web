"use client";

import React, { useState, useEffect } from "react";
import { getDiarios, getDiarioById } from "@/lib/api/diario";
import ModalDiario from "@/components/common/Modals/Diario/ModalEscreverDiario";
import { createDiario } from "@/lib/api/diario";
import { useSearchParams, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [tituloModal, setTituloModal] = useState("");
  const [textoModal, setTextoModal] = useState("");
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

  useEffect(() => {
    const open = searchParams?.get?.("openModal");
    if (open === "1") {
      setOpenModal(true);
      // remove query param from URL to avoid re-opening on navigation back
      const url = new URL(window.location.href);
      url.searchParams.delete('openModal');
      router.replace(url.pathname + url.search);
    }
  }, [searchParams]);

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
                        </div>
                      </div>

                      {/* Mostrar apenas o texto da análise da Athena (ou aviso) no cartão */}
                      <p className="text-sm mb-4 font-inter leading-relaxed text-left whitespace-pre-line">
                        {card.analysis && card.analysis.message
                          ? card.analysis.message
                          : 'Análise ainda não disponível.'}
                      </p>

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
            className="inline-flex items-center gap-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition duration-200 ease-in-out shadow-md hover:shadow-lg"
            aria-label={`Ver análise de ${card.title}`}
          >
            <Image src="/images/icons/lupa.svg" alt="Lupa" width={14} height={14} />
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

      <ModalDiario
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        value={textoModal}
        onChange={(v: string) => setTextoModal(v)}
        title={tituloModal}
        onTitleChange={(t: string) => setTituloModal(t)}
        onSave={(created?: any) => {
          // Atualiza a lista local com o item criado (se o modal retornou algo)
          if (created) {
            const titulo = created.titulo ?? created.title ?? 'Diário';
            const texto = created.texto ?? created.text ?? created.descricao ?? '';
            const data_hora = created.data_hora ?? created.createdAt ?? new Date().toISOString();
            const hasAnalysis = Boolean(
              created?.comentario_athena || created?.comentario || created?.athena || created?.emocao_predominante || created?.emocao || created?.intensidade_emocional || created?.intensidade
            );

            const newCard: Card = {
              id: created.id ?? created._id ?? Math.random(),
              title: titulo,
              date: data_hora ? formatDate(data_hora) : '',
              description: texto,
              analysis: hasAnalysis
                ? {
                    message: texto,
                    emotion: (created.emocao_predominante ?? created.emocao) ?? "",
                    intensity: (created.intensidade_emocional ?? created.intensidade) ?? "",
                    athena: (created.comentario_athena ?? created.comentario ?? created.athena) ?? "",
                  }
                : undefined,
            };
            setCards((prev) => [newCard, ...prev]);

            // Se ainda não houver análise, tenta reconsultar algumas vezes
            const hasAnalysisNow = Boolean(newCard.analysis);
            if (!hasAnalysisNow && (created.id || created._id)) {
              const id = created.id ?? created._id;
              (async function poll() {
                for (let i = 0; i < 6; i++) {
                  try {
                    const fresh = await getDiarioById(String(id));
                    const entry = fresh?.entrada ?? fresh;
                    if (entry && (entry.comentario_athena || entry.emocao_predominante || entry.intensidade_emocional)) {
                      setCards((prev) => prev.map((c) => c.id === (entry.id ?? entry._id) ? {
                        ...c,
                        date: formatDate(entry.data_hora ?? entry.createdAt ?? new Date().toISOString()),
                        description: entry.texto ?? entry.text ?? c.description,
                        analysis: {
                          message: entry.texto ?? entry.text ?? c.description,
                          emotion: entry.emocao_predominante ?? entry.emocao ?? "",
                          intensity: entry.intensidade_emocional ?? entry.intensidade ?? "",
                          athena: entry.comentario_athena ?? entry.comentario ?? entry.athena ?? "",
                        }
                      } : c));
                      break;
                    }
                  } catch (e) {
                    // ignore
                  }
                  await new Promise((r) => setTimeout(r, 2000));
                }
              })();
            }
          }
          setOpenModal(false);
        }}
      />
    </div>
  );
}


//codigo certo