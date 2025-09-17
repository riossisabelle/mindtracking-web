"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Modal from "../../../../common/Modals/ModalRedefinicaoSenha";
import Button from "../../../../common/Buttons/ButtonVerificarEmail";
import PasswordInput from "../../../../common/Inputs/InputSenha";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  email: string;
}

// Regex para validação - exatamente 8 caracteres
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8}$/;

function containsOnlyAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}

// Validação de senha
function validatePassword(password: string, confirm: string): string | null {
  if (!password || !confirm) return "Preencha todos os campos";
  if (!containsOnlyAscii(password)) return "A senha não pode conter emoji";
  if (password.length !== 8) return "A senha deve ter exatamente 8 caracteres";
  if (!passwordRegex.test(password))
    return "A senha deve incluir letra maiúscula, minúscula, número e caractere especial";
  if (password !== confirm) return "As senhas não coincidem";
  return null;
}

export default function ResetPasswordModal({
  isOpen,
  onClose,
  onSuccess,
  email, // eslint-disable-line @typescript-eslint/no-unused-vars
}: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const passwordError = useMemo(
    () => validatePassword(password, confirm),
    [password, confirm],
  );
  const isInvalid = Boolean(passwordError);

  const handleBlur = () => setTouched(true);

  const handleReset = async () => {
    setTouched(true);
    setSubmitError(null);
    if (passwordError) return;

    try {
      setLoading(true);
      // TODO: chamada real da API /auth/reset usando o email
      // const res = await fetch("/auth/reset", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      await new Promise((r) => setTimeout(r, 1000));
      onSuccess();
    } catch {
      setSubmitError("Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center lg:w-[523px] lg:h-auto mx-auto">
          {/* Logo */}
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

          {/* Título */}
          <h2 className="text-[22px] md:text-[32px] font-bold">
            Crie sua nova senha
          </h2>
          <div className="md:pt-6 md:pb-8 pt-3 pb-8">
            <p className="text-[13px] md:text-[16px] font-medium text-center w-70 md:w-115 lg:w-130">
              Perfeito! Agora, defina uma nova senha de acesso. Escolha uma
              combinação forte para manter sua conta e suas reflexões sempre
              seguras.
            </p>
          </div>

          {/* Campo Senha */}
          <div className="w-full max-w-md mb-3">
            <PasswordInput
              id="new-password"
              name="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
              error={touched ? passwordError : null}
              required
              maxLength={8}
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className="w-full max-w-md mb-3">
            <PasswordInput
              id="confirm-password"
              name="confirm"
              label="Confirme sua senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={handleBlur}
              error={touched ? passwordError : null}
              required
              maxLength={8}
            />
          </div>

          {/* Mensagem de erro de submit */}
          {submitError && !passwordError && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {submitError}
            </p>
          )}

          {/* Botão */}
          <div className="pt-3">
            <Button
              onClick={handleReset}
              loading={loading}
              disabled={loading || isInvalid}
            >
              {loading ? "Carregando..." : "Confirmar senha"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
