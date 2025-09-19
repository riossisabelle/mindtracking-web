import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import IconInput from "@/components/common/Inputs/InputEmail";
import PasswordInput from "@/components/common/Inputs/InputSenha";
import Button from "@/components/common/Buttons";
import { motion } from "framer-motion";
import { ArrowBigDown, Calendar, ChevronLeft, Phone } from "lucide-react";
import GenderSelect from "@/components/common/Inputs/InputGenero";

export default function Register() {
  const { theme } = useTheme();
  const [displayedText, setDisplayedText] = useState("");
  const [isRegisterView, setIsRegisterView] = useState(true);
  const [currentText, setCurrentText] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // 1. Remove tudo que não for número
    const onlyNums = rawValue.replace(/[^\d]/g, "");

    // 2. Aplica a máscara DD/MM/AAAA
    let formattedDate = onlyNums;
    if (onlyNums.length > 2) {
      formattedDate = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
    }
    if (onlyNums.length > 4) {
      formattedDate = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
    }

    // 3. Atualiza o estado com o valor formatado
    setBirthdate(formattedDate);
  };

  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // 1. Remove tudo que não for número
    const onlyNums = rawValue.replace(/[^\d]/g, "");

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNums = onlyNums.slice(0, 11);

    // 2. Aplica a máscara dinâmica
    let formattedPhone = limitedNums;
    if (limitedNums.length > 2) {
      formattedPhone = `(${limitedNums.slice(0, 2)}) ${limitedNums.slice(2)}`;
    }

    // Se for um celular com 9º dígito
    if (limitedNums.length > 6 && limitedNums.length === 11) {
      formattedPhone = `(${limitedNums.slice(0, 2)}) ${limitedNums.slice(2, 7)}-${limitedNums.slice(7)}`;
    }
    // Se for um telefone fixo ou celular antigo
    else if (limitedNums.length > 6) {
      formattedPhone = `(${limitedNums.slice(0, 2)}) ${limitedNums.slice(2, 6)}-${limitedNums.slice(6)}`;
    }

    // 3. Atualiza o estado
    setPhone(formattedPhone);
  };

  const fullTextForRegister =
    "Bem-vindo à MindTracking! Eu sou a Athena, sua assistente emocional. Estou aqui pra te ajudar a entender melhor seus sentimentos e serei sua parceira nessa jornada de autoconhecimento. Preciso te conhecer um pouco para te cadastrar nesta jornada.";
  const fullTextForRegisterTwo =
    "Pra começarmos do jeitinho certo, me conta seu nome e quando você nasceu. Assim, posso te conhecer melhor e deixar tudo mais personalizado por aqui.";
  
    const toggleView = () => {
    setIsRegisterView(!isRegisterView);
  };

  const handleRegisterClick = () => {
    toggleView();
  };

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullTextForRegister.length) {
        setDisplayedText(fullTextForRegister.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [setIsRegisterView]);

  useEffect(() => {
    let i = 0;
    const typingText = setInterval(() => {
      if (i < fullTextForRegisterTwo.length) {
        setCurrentText(fullTextForRegisterTwo.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingText);
      }
    }, 30);
  }, [setIsRegisterView]);

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start  lg:justify-between px-5">
      {isRegisterView ? (
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start  lg:justify-between">
          <div className="hidden lg:flex flex-col items-center mt-8 relative">
            <div className="flex items-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`hidden lg:flex absolute left-[15em] w-[16em] max-w-[420px] p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-slate-700 text-white" : "bg-white text-slate-900"} border ${theme === "dark" ? "border-slate-600" : "border-slate-200"}`}
                style={{
                  borderRadius: "16px 16px 16px 0",
                  zIndex: 20,
                }}
              >
                <p className="text-sm font-medium">{displayedText}</p>
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
                  onClick={handleRegisterClick}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          <div className="hidden lg:flex flex-col items-center mt-8 relative">
            <div className="absolute md:top-[-3.5em] md:left-[-2.745em] lg:top-[-5.5em] lg:left-[-2.745em]">
              <button className="cursor-pointer" onClick={toggleView}>
                <ChevronLeft
                  size={48}
                  className={`${theme === "dark" ? "text-white" : "text-slate-900"}`}
                />
              </button>
            </div>

            <div className="flex items-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`hidden lg:flex absolute left-[12em] top-[-2em] w-[16em] max-w-[257px] p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-slate-700 text-white" : "bg-white text-slate-900"} border ${theme === "dark" ? "border-slate-600" : "border-slate-200"}`}
                style={{
                  borderRadius: "16px 16px 16px 0",
                  zIndex: 20,
                }}
              >
                <p className="text-sm font-medium">{currentText}</p>
              </motion.div>
              <Image
                className=""
                src="/images/athena-apontando-prancheta.png"
                alt="Athena apontando para a direita"
                width={200}
                height={200}
              />
            </div>
          </div>
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
                Estamos quase lá...
              </h1>
              <h2 className="text-center text-base w-64 md:w-full md:text-lg leading-snug">
                Precisamos apenas de seu nome e sua data de nascimento para
                completar seu cadastro
              </h2>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <IconInput
                width="w-full"
                type="name"
                id="forgot-name"
                name="name"
                label="Nome"
                icon={
                  theme === "dark"
                    ? "../images/icons/UsuarioEmail.svg"
                    : "../images/icons/UsuarioEmail-black.svg"
                }
                iconClassName="w-6.5 h-auto"
                inputMode="text"
                autoComplete="name"
                maxLength={254}
                required
              />

              <IconInput
                width="w-full"
                type="text" // Mantém como texto
                id="birthdate"
                name="birthdate"
                label="Data de nascimento"
                placeholder="DD/MM/AAAA" // Você pode adicionar um placeholder explícito se quiser
                icon={
                  // theme === "dark"
                  //   ? "../images/icons/Calendar.svg" // Sugestão: use um ícone de calendário
                  //   : "../images/icons/Calendar-black.svg"
                  <Calendar
                    className={`${theme === "dark" ? "text-slate-50" : "text-gray-800"}`}
                  />
                }
                iconClassName="w-6.5 h-auto"
                inputMode="numeric" // Melhora a experiência em celulares (mostra o teclado numérico)
                maxLength={10} // Limita o tamanho para DD/MM/AAAA
                required
                value={birthdate} // O valor do input é controlado pelo estado
                onChange={handleDateChange} // A mágica acontece aqui
              />

              <IconInput
                width="w-full"
                type="text" // CORRIGIDO
                id="phone"
                name="phone"
                label="Telefone"
                placeholder="(XX) XXXXX-XXXX"
                icon={
                  <Phone
                    className={`${theme === "dark" ? "text-slate-50" : "text-gray-800"}`}
                  />
                }
                iconClassName="w-6.5 h-auto"
                inputMode="tel" // CORRIGIDO
                maxLength={15} // Aumentado para comportar a máscara completa (XX) XXXXX-XXXX
                required
                value={phone} // Controlado pelo estado
                onChange={handlePhoneChange} // Função de formatação
              />

              <GenderSelect />
            </div>

            <div className="w-full mt-5 flex flex-col items-center">
              <Button
                text="Criar minha conta"
                widthClass=" md:w-full"
                type="submit"
                onClick={handleRegisterClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
