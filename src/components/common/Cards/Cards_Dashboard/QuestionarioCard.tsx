"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import BaseCard from "./BaseCard";

// Propriedade para número de questionários e se já respondeu hoje
export default function QuestionarioCard({
  respondidos = 0,
  respondeuHoje = false,
  loading = false,
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  console.log('QuestionarioCard respondeuHoje:', respondeuHoje, 'loading:', loading);

  const handleQuestionarioClick = () => {
    if (!loading && !respondeuHoje) {
      router.push("/questionnaire");
    }
  };

  return (
    <BaseCard>
      <div className="flex justify-between items-center">
        <h1
          className={`text-[20px] font-semibold ${isDark ? "text-white" : "text-slate-800"}`}
        >
          {respondeuHoje ? "Questionários respondidos" : "Questionário diário"}
        </h1>
        <Image
          src={
            isDark
              ? "/images/icons/IconeQuestionario.svg"
              : "/images/icons/IconeQuestionario-black.svg"
          }
          alt="Logo"
          width={54}
          height={51}
          className="w-9 h-auto"
        />
      </div>

      {respondeuHoje ? (
        <div
          className={`flex items-center gap-3 pt-4 pb-2 ${isDark ? "" : "text-gray-700"}`}
        >
          <span
            className={`text-[40px] font-semibold ${isDark ? "text-white" : "text-slate-800"}`}
          >
            {respondidos}
          </span>
          <span className="text-green-500 text-xl">&#8593;</span>
          <span
            className={`pl-1 text-[15px] font-medium ${isDark ? "text-white" : "text-slate-800"}`}
          >
            Parabéns continue desta forma!
          </span>
        </div>
      ) : (
        <div className={`pt-4.5 pb-4.5`}>
          <button
            onClick={handleQuestionarioClick}
            disabled={loading || respondeuHoje}
            className={`
              md:w-full md:h-[50px] sm:w-[290px] sm:h-[50px] w-[290px] h-[50px]
              ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }
              font-bold text-[16px] py-2 rounded-3xl border-4 border-transparent transition-all duration-200 cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed
              active:scale-[0.98] active:brightness-95 active:border-blue-700
              active:drop-shadow-[0_0_15px_#0C4A6E]
            `}
          >
            {loading ? "Verificando..." : "Responda seu questionário de hoje"}
          </button>
        </div>
      )}
    </BaseCard>
  );
}