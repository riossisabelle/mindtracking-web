"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";
import { useState } from "react";

// Troque para o valor real dinâmico da sua aplicação
const diarioRespondido = true; // true = escreveu o diário hoje

export default function DiarioEmocionalCard() {
  const { theme } = useTheme();
  const [modalAberto, setModalAberto] = useState(false);
  const modalBg = theme === "dark" ? "bg-slate-800 border-green-600" : "bg-white border-green-600";
  const textColor = theme === "dark" ? "text-white" : "text-slate-800";
  const textTitle = theme === "dark" ? "text-white" : "text-slate-800";
  const textBody = theme === "dark" ? "text-white" : "text-slate-800";

  return (
    <>
      <BaseCard>
        <div className="flex flex-col justify-between h-full">
          {/* Cabeçalho com ícone e título */}
          <div className="flex items-center gap-4">
            <Image
              src={
                theme === "dark"
                  ? "/images/icons/IconeDiario.svg"
                  : "/images/icons/IconeDiarioDark.svg"
              }
              alt="Ícone Diário"
              width={24}
              height={24}
              className="w-8 h-8"
            />
            <h1 className="text-[20px] font-semibold">Seu Diário Emocional</h1>
          </div>

          {/* Conteúdo */}
          <div
            className={`mt-4 space-y-3 text-[15px] font-semibold font-inter ${textColor}`}
          >
            <p>
              Último diário registrado:{" "}
              <span>
                &ldquo;Não consegui dormir direito. Senti ansiedade e medo...&rdquo;
              </span>
            </p>
            <p>25/06 às 22h12</p>
            <p>
              <span className="font-semibold">Emoção predominante:</span> Ansiedade
            </p>
            <p>
              <span className="font-semibold">Intensidade emocional:</span> Alta
            </p>
            <p>
              <span className="font-semibold">Athena diz:</span>
              <br />
              &ldquo;Você parece sobrecarregado. Tente relaxar com uma meditação.&rdquo;
            </p>
          </div>

          {/* Botão */}
          {diarioRespondido ? (
            // Se diário já foi respondido, botão cinza e leva ao modal
            <button
              className="
                my-6 w-full h-[50px]
                bg-green-600 hover:bg-green-700 text-white font-bold text-[16px] py-2 rounded-3xl border-4 border-transparent
                transition-all duration-200 cursor-pointer
               active:scale-[0.98] active:brightness-95
                active:border-green-900 active:drop-shadow-[0_0_15px_#383838]"
              onClick={() => setModalAberto(true)}
            >
              Diário já registrado
            </button>
          ) : (
            // Se diário não respondido, botão azul normal
            <a href="/questionnaire">
              <button
                className={`
                  my-6 w-full h-[50px]
                  bg-blue-600 hover:bg-blue-500 text-white font-bold text-[16px] py-2 rounded-3xl border-4 border-transparent
                  transition-all duration-200 cursor-pointer
                  disabled:opacity-60 disabled:cursor-not-allowed
                  active:scale-[0.98] active:brightness-95 active:border-blue-700
                  active:drop-shadow-[0_0_15px_#0C4A6E]
                `}
              >
                Escrever no diário
              </button>
            </a>
          )}
        </div>
      </BaseCard>

      {/* Modal quando clicar no botão cinza */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className={`rounded-xl border p-6 w-full max-w-md shadow-lg ${modalBg}`}>
          <h2 className={`text-xl font-bold mb-2 ${textTitle}`}>
            Sua reflexão de hoje já foi registrada!
          </h2>
          <p className={`mb-4 text-[15px] font-semibold font-inter ${textBody}`}>
            Para incentivar um registro focado e significativo, nossa plataforma foi desenhada para um diário emocional por dia. Isso ajuda a consolidar os pensamentos e sentimentos mais importantes do seu dia.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 active:scale-[0.98] active:brightness-95
              active:border-green-900 active:drop-shadow-[0_0_15px_#383838] cursor-pointer text-white rounded-full py-2 w-full font-bold text-[16px] transition"
            onClick={() => setModalAberto(false)}
          >
            Entendido
          </button>
        </div>
      </div>
      )}
    </>
  );
}
