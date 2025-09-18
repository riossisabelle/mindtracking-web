"use client";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  helperText?: string;
  describedById?: string;
}

export default function PasswordInput({
  label,
  error,
  helperText,
  describedById,
  ...props
}: PasswordInputProps) {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const isError = Boolean(error);
  const helperId =
    describedById ||
    (helperText || isError ? `${props.id || props.name}-helper` : undefined);

  return (
    <div className="flex flex-col gap-1">
      {/* Container para centralizar o input */}
      <div className="flex justify-center">
        <div
          className={`flex items-center md:w-[412px] md:h-[53px] sm:w-[290px] sm:h-[53px] px-3 py-2 border-2 rounded-xl ${
            isError
              ? "border-red-500"
              : theme === "dark"
                ? "bg-gray-800 border-blue-600 text-slate-50"
                : "bg-gray-200 border-blue-900 text-gray-800"
          }`}
        >
          {/* Ícone cadeado */}
          <Image
            src={
              theme === "dark"
                ? "/images/icons/Cadeado-branco.svg"
                : "/images/icons/Cadeado-preto.svg"
            }
            alt="cadeado"
            width={26}
            height={26}
            className="md:w-6.5 md:h-6.5"
          />

          {/* Input */}
          <input
            {...props}
            type={show ? "text" : "password"}
            placeholder={label}
            aria-invalid={isError || undefined}
            aria-describedby={helperId}
            className={`w-full font-bold text-[15.37px] ml-1.5 bg-transparent placeholder-opacity-50 focus:outline-none ${
              theme === "dark"
                ? "text-slate-50 placeholder-white"
                : "text-gray-800 placeholder-slate-900"
            }`}
          />

          {/* Botão toggle */}
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Image
              src={
                show
                  ? theme === "dark"
                    ? "/images/icons/OlhoFechado-branco.svg"
                    : "/images/icons/OlhoFechado-preto.svg"
                  : theme === "dark"
                    ? "/images/icons/OlhoAberto-branco.svg"
                    : "/images/icons/OlhoAberto-preto.svg"
              }
              alt={show ? "ocultar senha" : "mostrar senha"}
              width={26}
              height={26}
              className="md:size-7.5"
            />
          </button>
        </div>
      </div>

      {/* Mensagem de erro ou helper alinhada com o início do input */}
      {(helperText || isError) && (
        <div className="flex justify-center">
          <div className="md:w-[412px] sm:w-[290px]">
            <p
              id={helperId}
              className={`text-xs text-left ${isError ? "text-red-500" : theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
            >
              {isError ? error : helperText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}