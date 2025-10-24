"use client";

import React, { useState, useEffect } from "react";
import { getDiarios } from "@/lib/api/diario";
import ModalDiario from "@/components/common/Modals/Diario/ModalEscritaDiario";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../../../contexts/ThemeContext";
import Sidebar from "@/components/layout/Sidebar";
import ModalAnalise from "@/components/common/Modals/Diario/ModalAnalise";

// Hook para detectar tamanho da tela
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

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

interface DiarioEntry {
  id?: string | number;
  _id?: string | number;
  titulo?: string;
  title?: string;
  texto?: string;
  text?: string;
  descricao?: string;
  mensagem?: string;
  data_hora?: string;
  createdAt?: string;
  date?: string;
  emocao_predominante?: string;
  emocao?: string;
  intensidade_emocional?: string;
  intensidade?: string;
  comentario_athena?: string;
  comentario?: string;
  athena?: string;
}

interface DiarioResponse {
  entradas?: DiarioEntry[];
  data?: DiarioEntry[];
}

export default function Diario() {
  const { theme } = useTheme();
  const screenSize = useScreenSize();
  
  const formatDate = (iso?: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const truncateText = (text: string) => {
    // Limite responsivo baseado no tamanho da tela
    let maxLength: number;
    
    if (screenSize.width < 640) {
      // Mobile pequeno (sm)
      maxLength = 120;
    } else if (screenSize.width < 768) {
      // Mobile médio
      maxLength = 150;
    } else if (screenSize.width < 1024) {
      // Tablet
      maxLength = 200;
    } else {
      // Desktop
      maxLength = 300;
    }
    
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null,
  );
  const [cards, setCards] = useState<Card[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const resp = await getDiarios();

        let entradas: DiarioEntry[] = [];
        if (Array.isArray(resp)) entradas = resp as DiarioEntry[];
        else if ((resp as DiarioResponse)?.entradas)
          entradas = (resp as DiarioResponse).entradas || [];
        else if ((resp as DiarioResponse)?.data)
          entradas = (resp as DiarioResponse).data || [];

        const mapped = entradas.map((e: DiarioEntry) => {
          const titulo = e.titulo ?? e.title ?? "Diário";
          const texto = e.texto ?? e.text ?? e.descricao ?? e.mensagem ?? "";
          const data_hora = e.data_hora ?? e.createdAt ?? e.date ?? null;

          const emocao = (e.emocao_predominante ?? e.emocao) || null;
          const intensidade =
            (e.intensidade_emocional ?? e.intensidade) || null;
          const comentarioAthena =
            (e.comentario_athena ?? e.comentario ?? e.athena) || null;
          const hasAnalysis = Boolean(
            comentarioAthena || emocao || intensidade,
          );

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
        setCards(mapped as Card[]);
        setFetchError(null);
      } catch (error) {
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
      const url = new URL(window.location.href);
      url.searchParams.delete("openModal");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  return (
    <div className="h-screen min-h-0 flex flex-col">
      <Sidebar />

      <div className="flex flex-col min-h-0 h-full p-6 md:p-10 lg:ml-37.5 md:mt-20 mt-25 lg:mt-0 overflow-hidden">
        <h1
          className={`text-2xl font-bold mb-10 font-inter ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } transition-all duration-300 ease-in-out`}
        >
          Diário Emocional
        </h1>
        <div
          className={`flex-1 min-h-0 flex flex-col rounded-xl p-6 ${
            theme === "dark"
              ? "border-2 border-blue-600 bg-slate-900"
              : "bg-white border-2 border-black"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
            {loading ? (
              <p className="text-center font-inter">Carregando...</p>
            ) : cards.length === 0 ? (
              <p className="text-center font-inter">
                Nenhum registro encontrado.
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between shrink-0">
                  <div className="text-sm text-gray-400 pl-4">
                    Registros encontrados:{" "}
                    <span className={`font-medium ${
                      theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                    }`}>
                      {cards.length}
                    </span>
                  </div>
                  {fetchError && (
                    <div className="text-sm text-red-400">
                      Erro: {fetchError}
                    </div>
                  )}
                </div>
                <div className="grid gap-0 w-full max-w-full sm:grid-cols-1 md:grid-cols-2 auto-rows-fr">
                  {cards.map((card) => (
                    <div key={card.id} className="p-4 max-w-full h-full">
                      <div
                        className={`w-full h-full rounded-lg p-4 border-2 transition-all duration-300 ease-in-out flex flex-col ${
                          theme === "dark"
                            ? "bg-slate-800 text-gray-200 border-blue-600"
                            : "bg-slate-50 text-gray-800 border-blue-500"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h2 className="font-inter font-bold text-base md:text-lg">
                              {card.title}
                            </h2>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-gray-400 font-inter">
                              {card.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <p className="text-sm mb-4 font-inter leading-relaxed text-left whitespace-pre-line flex-1">
                            {card.analysis && card.analysis.message
                              ? truncateText(card.analysis.message)
                              : "Análise ainda não disponível."}
                          </p>
                          {card.analysis && (
                            <div className="mt-auto">
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                                aria-label={`Ver análise de ${card.title}`}
                              >
                                <Image
                                  src="/images/icons/lupa.svg"
                                  alt="Lupa"
                                  width={14}
                                  height={14}
                                />
                                <span>Ver Análise</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
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
        onSaved={() => {
          // Aqui você pode implementar a lógica para abrir a análise
          // Por enquanto, apenas fechamos o modal
          setOpenModal(false);
        }}
      />
    </div>
  );
}
