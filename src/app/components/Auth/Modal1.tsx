"use client";
import { useState } from "react";
import Modal from "../Ui/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // abre modal 2
}

export default function ForgotPasswordModal({ isOpen, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecover = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao enviar recuperação.");
      }

      onSuccess(); // sucesso → abre modal 2
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-3xl">🧠</div>
        <h2 className="text-xl font-semibold">Esqueceu sua senha?</h2>
        <p className="text-sm text-gray-400 text-center">
          Sem problemas. Digite seu e-mail para enviarmos as instruções.
        </p>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-600 bg-transparent focus:outline-none"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleRecover}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Enviando..." : "Verificar seu e-mail"}
        </button>
      </div>
    </Modal>
  );
}
