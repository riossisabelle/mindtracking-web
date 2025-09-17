"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Modal from "../../../../common/Modals/ModalRedefinicaoSenha";
import Button from "../../../../common/Buttons/ButtonVerificarEmail";
import IconInput from "../../../../common/Inputs/InputEmail";
import { useTheme } from "@/contexts/ThemeContext";
import { recuperarSenha } from "@/lib/api/auth";
import { isAxiosError } from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void; // abre modal 2
}

function isAsciiOnly(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}

function validateEmail(valueRaw: string): string | null {
  const value = valueRaw.trim();

  if (!value) return "E-mail é obrigatório";

  if (!isAsciiOnly(valueRaw)) return "Caracteres inválidos: apenas ASCII (sem emoji)";

  if (/[\s]/.test(valueRaw)) return "E-mail não pode conter espaços";

  if (value.length > 254) return "E-mail muito longo";

  const atCount = (value.match(/@/g) || []).length;
  if (atCount !== 1) return "E-mail deve conter exatamente um '@'";

  const [local, domain] = value.split("@");
  if (!local || !domain) return "Formato de e-mail inválido";

  // Local part rules
  if (local.length > 64) return "Parte local do e-mail é muito longa";
  if (!/^[A-Za-z0-9._%+-]+$/.test(local)) return "Caracteres inválidos na parte local";
  if (local.startsWith(".") || local.endsWith(".")) return "Parte local não pode iniciar/terminar com ponto";
  if (local.includes("..")) return "Parte local não pode conter '..'";

  // Domain rules
  if (domain.length > 255) return "Domínio do e-mail é muito longo";
  if (!/^[A-Za-z0-9.-]+$/.test(domain)) return "Caracteres inválidos no domínio";
  if (!domain.includes(".")) return "Domínio deve conter ponto";
  if (domain.includes("..")) return "Domínio não pode conter '..' ou mais de um ponto";

  const labels = domain.split(".");
  if (labels.some((l) => l.length === 0)) return "Domínio inválido";
  for (const label of labels) {
    if (label.length < 1 || label.length > 63) return "Cada rótulo do domínio deve ter 1–63 caracteres";
    if (!/^[A-Za-z0-9-]+$/.test(label)) return "Domínio possui caracteres inválidos";
    if (label.startsWith("-") || label.endsWith("-")) return "Rótulos do domínio não podem iniciar/terminar com '-'";
  }

  const tld = labels[labels.length - 1];
  if (!/^[A-Za-z]{2,63}$/.test(tld)) return "TLD inválido (apenas letras, 2–63)";

  // Lista de domínios permitidos (normalizados em minúsculas)
  const allowedDomains = new Set([
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com.br",
    "terra.com.br",
    "uol.com.br",
  ]);
  if (!allowedDomains.has(domain.toLowerCase())) {
    return "Este não é um domínio permitido";
  }

  return null;
}


export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const emailError = useMemo(() => validateEmail(email), [email]);
  const isInvalid = Boolean(emailError);

  const handleBlur = () => setTouched(true);

  const handleRecover = async () => {
    setTouched(true);
    setSubmitError(null);
    if (emailError) return;

    try {
      setLoading(true);

      // 🔹 chamada real da API
      await recuperarSenha({ email });

      // se deu certo, abre o próximo modal, passando o email digitado
      onSuccess(email);
    } catch (error: unknown) {
      setSubmitError(
        isAxiosError(error)
          ? error.response?.data?.message || "Erro ao recuperar senha"
          : "Erro ao recuperar senha"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center lg:w-[530px] lg:h-[400px] mx-auto">
          <div className="md:mb-8 mb-6">
            <Image
              src={
                theme === "dark"
                  ? "/images/icons/Logo_branca.svg"
                  : "/images/icons/Logo-slate-900.svg"
              }
              alt="Logo"
              width={54}
              height={51}
              className="w-16.5 h-auto"
            />
          </div>
          <h2 className="text-[22px] md:text-[32px] font-bold">
            Esqueceu sua senha?
          </h2>
          <div className="md:pt-6 md:pb-12.5 pt-3 pb-10">
            <p className="text-[13px] md:text-[16px] font-medium text-center">
              Sem problemas. Nós cuidamos disso para você.
            </p>
            <p className="text-[13px] md:text-[16px] font-medium text-center md:w-110 lg:w-full">
              Digite seu e-mail de cadastro para darmos o próximo passo juntos
            </p>
          </div>
          <div>
            <IconInput
              type="email"
              id="forgot-email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              error={touched ? emailError : null}
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
          </div>

          {submitError && !emailError && (
            <p className="text-red-500 text-sm mt-1">{submitError}</p>
          )}

          <div className="pt-8">
            <Button
              onClick={handleRecover}
              loading={loading}
              disabled={loading || isInvalid}
            >
              {loading ? "Carregando..." : "Verificar seu e-mail"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}