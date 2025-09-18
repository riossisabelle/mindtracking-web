import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import IconInput from "@/components/common/Inputs/InputEmail";
import PasswordInput from "@/components/common/Inputs/InputSenha";
import Button from "@/components/common/Buttons";
import { motion } from "framer-motion";

export default function Register() {
  const { theme } = useTheme();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Bem-vindo à MindTracking! Eu sou a Athena, sua assistente emocional. Estou aqui pra te ajudar a entender melhor seus sentimentos e serei sua parceira nessa jornada de autoconhecimento. Preciso te conhecer um pouco para te cadastrar nesta jornada.";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start  lg:justify-between px-5">
      <div className="hidden lg:flex flex-col items-center mt-8 relative">
        <div className="flex items-start">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`hidden lg:flex absolute left-[15em] w-[16em] max-w-[420px] p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-slate-700 text-white" : "bg-white text-slate-900"} border ${theme === "dark" ? "border-slate-600" : "border-slate-200"}`}
            style={{ 
              borderRadius: "16px 16px 16px 0",
              zIndex: 20
            }}
          >
            <p className="text-sm">{displayedText}</p>
          </motion.div>
          <Image
            className=""
            src="/images/athena-apontando-direito.png"
            alt="Athena apontando para a direita"
            width={230}
            height={230}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-auto w-[28.125em] gap-2">
        <div className="flex flex-col items-center justify-center my-auto w-[28.125em] gap-2">
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
              Vamos começar!
            </h1>
            <h2 className="text-center text-base w-64 md:w-full md:text-lg leading-snug">
              Sua jornada rumo ao equilíbrio emocional começa aqui
            </h2>
          </div>
          <div className="flex flex-col gap-4">
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
            
            <PasswordInput
              width="w-full"
              type="password"
              id="forgot-password"
              name="password"
              label="Confirme sua senha"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
            />
          </div>

          <div className="w-full mt-5 flex flex-col items-center">
            <Button
              text="Prosseguir para próxima etapa"
              widthClass=" md:w-full"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
