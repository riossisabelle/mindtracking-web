"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import BaseCard from "./BaseCard";

export default function DiarioEmocionalCard() {
    const { theme } = useTheme();

    return (
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
                    <h1 className="text-[20px] font-semibold ">Seu Diário Emocional</h1>
                </div>

                {/* Conteúdo */}
                <div className="mt-4 space-y-3 text-[15px]">
                    <p className="text-gray-300">
                        Último diário registrado:{" "}
                        <span className="italic">
                            "Não consegui dormir direito. Senti ansiedade e medo..."
                        </span>
                    </p>

                    <p className="text-gray-300">25/06 às 22h12</p>

                    <p className="text-gray-300">
                        <span className="font-semibold">Emoção predominante:</span> Ansiedade
                    </p>

                    <p className="text-gray-300">
                        <span className="font-semibold">Intensidade emocional:</span> Alta
                    </p>

                    <p className="text-gray-300">
                        <span className="font-semibold">Athena diz:</span>
                        <br />
                        “Você parece sobrecarregado. Tente relaxar com uma meditação.”
                    </p>
                </div>

                {/* Botão */}
                <a href="/Questionnaire">

                    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-full text-white font-medium transition">
                        Escrever no diário
                    </button>
                </a>
            </div>
        </BaseCard>
    );
}
