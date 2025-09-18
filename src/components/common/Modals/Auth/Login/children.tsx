import IconInput from "@/components/common/Inputs/InputEmail";
import Image from "next/image";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import PasswordInput from "@/components/common/Inputs/InputSenha";
import Link from "next/link";
import Button from "@/components/common/Buttons";

export default function Login() {
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex flex-col items-center justify-between w-full md:w-[28.125em] gap-4">
        <Image
          src={
            theme === "dark"
              ? "../images/icons/Logo_branca.svg"
              : "../images/icons/Logo-slate-900.svg"
          }
          alt="logo"
          width={64}
          height={64}
        />
        <div className="flex flex-col items-center justify-between w-full gap-2">
          <h1 className="text-center text-2xl md:text-3xl font-bold leading-snug">
            Bem-vindo de volta
          </h1>
          <h2 className="text-center text-base md:text-lg leading-snug">
            Seu bem-estar importa todos os dias
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <IconInput
            width="w-full"
            type="email"
            id="forgot-email"
            name="email"
            label="Email"
            icon={
              theme === "dark"
                ? "../images/icons/UsuarioEmail.svg"
                : "../images/icons/UsuarioEmail-black.svg"
            }
            iconClassName="w-6.5 h-auto"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
          />

          <PasswordInput
            width="w-full"
            type="password"
            id="forgot-password"
            name="password"
            label="Senha"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </div>
        <div className="flex w-full max-w-72 md:max-w-full justify-end">
          <Link
            className={`text-right text-sm md:text-base font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            href={"/auth/register"}
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div className="w-full flex flex-col items-center">
          <Button text="Entrar" widthClass="w-full" type="submit" />
        </div>
      </div>
    </div>
  );
}
