"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function QuestionarioCard() {
    const { theme } = useTheme();
    return (
        <BaseCard>
        <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-semibold">Questionário</h1>
            <Image
              src={
                theme === "dark"
                  ? "/images/icons/IconeQuestionario.svg"
                  : "/images/icons/Logo-slate-900.svg"
              }
              alt="Logo"
              width={54}
              height={51}
              className="w-9 h-auto"
            />  
        </div>

        <div className="pt-4.5 pb-4.5">
            <button className={`
          md:w-full md:h-[52px] sm:w-[290px] sm:h-[50px] w-[290px] h-[50px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-[16px] 
          py-2 rounded-3xl border-4 border-transparent transition-all duration-200 cursor-pointer
          disabled:opacity-60 disabled:cursor-not-allowed
          active:scale-[0.98] active:brightness-95 active:border-blue-700
          active:drop-shadow-[0_0_15px_#0C4A6E]
        `}>
            Responda seu questionário de hoje
            </button>
          </div>
        </BaseCard>
    );
}
