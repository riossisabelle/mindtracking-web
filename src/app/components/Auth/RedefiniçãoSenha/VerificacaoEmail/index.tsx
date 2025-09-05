"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "../../../Ui/Modals/ModalRedefinicaoSenha";
import Button from "../../../Ui/Buttons/ButtonVerificarEmail";
import IconInput from "../../../Ui/Inputs/InputEmail";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // abre modal 2
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecover = async () => {
    setLoading(true);
    setError(null);


  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center lg:w-[530px] lg:h-[380px] mx-auto">
          <div className="lg:mb-8">
            <Image
              src="/images/icons/Logo_branca.svg"
              alt="Logo"
              width={54}
              height={51}
              className="w-16.5 h-auto"
            />
          </div>
          <h2 className="text-[32px] font-bold">Esqueceu sua senha?</h2>
          <div className="lg:pt-6 lg:pb-12.5">
            <p className="text-[16px] font-medium text-center">
              Sem problemas. Nós cuidamos disso para você.
            </p>
            <p className="text-[16px] font-medium text-center">
              Digite seu e-mail de cadastro para darmos o próximo passo juntos
            </p>
          </div>
          <div>
            <IconInput
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="../images/icons/UsuarioEmail.svg"
              iconClassName=""
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <Button onClick={() => console.log("Recuperar")} loading={false}>
              Verificar seu e-mail
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
