"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Modal from "../../../../common/Modals/perfil/ModalRedefinicaoSenha";
import Button from "../../../../common/Buttons/ButtonVerificarEmail";
import { useTheme } from "@/contexts/ThemeContext";
import { verifyEmail } from "@/lib/api/auth";
import { isAxiosError } from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (codigo: string) => void; // agora passa o código para o modal 3
  email: string;
}

export default function VerifyCodeModal({
  isOpen,
  onClose,
  onSuccess,
  email,
}: Props) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      const codigo = code.join("");
      // Chamada correta para verifyEmail
      await verifyEmail({ email, codigo });
      onSuccess(codigo);
    } catch (error: unknown) {
      setError(
        isAxiosError(error)
          ? error.response?.data?.message || "Erro ao verificar código"
          : "Erro ao verificar código"
      );
    } finally {
      setLoading(false);
    }
  };

  // Limpa os dados ao fechar o modal
  useEffect(() => {
    if (!isOpen) {
      setCode(["", "", "", ""]);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center lg:w-[530px] lg:h-[400px] mx-auto">
          <div className="mb-6 md:mb-8">
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
            Verificando seu e-mail
          </h2>
          <div className="md:pt-6 md:pb-12.5 pt-3 pb-10 flex flex-col items-center">
            <p className="text-[13px] md:text-[16px] font-medium text-center md:w-110 lg:w-full">
              Enviamos um código de 4 dígitos para seu e-mail.
            </p>
            <p className="text-[13px] md:text-[16px] w-65 md:w-full font-medium text-center">
              Insira o código abaixo para confirmar sua identidade e continuar.
            </p>
          </div>

          <div className="flex space-x-4">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                placeholder="0"
                onChange={(e) => handleChange(i, e.target.value)}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                className="text-[28px] md:text-[36px] font-bold text-center border-[2.2px] border-blue-600 rounded-[12px] w-16 h-16 md:w-20 md:h-20 placeholder-[#666666] focus:border-blue-600 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="mt-1 text-sm text-red-500 text-center">{error}</p>}

          <div className="pt-8">
            <Button
              onClick={handleVerify}
              loading={loading}
              disabled={loading || code.some((c) => c === "")}
            >
              {loading ? "Verificando..." : "Confirmar código"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

