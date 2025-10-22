"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../../../contexts/ThemeContext";
import { createDiario } from "@/lib/api/diario";

interface ModalDiarioProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
  title?: string;
  onTitleChange?: (t: string) => void;
  onSave?: (created?: any) => void;
}

export default function ModalDiario({
  isOpen,
  onClose,
  value,
  onChange,
  title = "",
  onTitleChange = () => {},
  onSave,
}: ModalDiarioProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4 py-[70px]">
      <div
        className={`p-8 rounded-2xl w-full max-w-[600px] relative shadow-xl transition-all duration-300 mt-[50px] mb-[50px]
        ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors p-1"
        >
          <Image
            src={theme === "dark" ? "/images/icons/fechar_b.svg" : "/images/icons/fechar.svg"}
            alt="Fechar"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </button>

        <div className="flex flex-col items-center gap-4 text-center">
          {/* Ícone diário */}
          <Image
            src="/images/icons/IconeDiario.svg" 
            alt="Ícone Diário"
            width={42}
            height={42}
            className="mb-2"
          />

          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold">Escrita no Diário</h2>
          <p className="text-base text-slate-400">Escreva livremente – somente você verá isso.</p>
        </div>

        {/* Campo de título */}
        <div className="mt-6">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            placeholder="Escreva o título do seu diário aqui..."
            className={`w-full rounded-xl p-3 outline-none border transition-all mb-3
              ${theme === "dark"
                ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                : "bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400"
              }`}
          />
        </div>

        {/* Área de texto */}
        <div className="mt-6">
          <textarea
            className={`w-full min-h-[160px] max-h-[270px] resize-none rounded-xl p-4 outline-none border transition-all
              ${theme === "dark"
                ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                : "bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400"
              }`}
            placeholder="Descreva aqui seu texto do diário..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        {/* Erro */}
        {error && <div className="text-red-400 mt-2">{error}</div>}

        {/* Botões */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className={`rounded-xl px-6 py-3 font-semibold transition-colors
              ${theme === "dark" ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-slate-200 text-gray-800 hover:bg-slate-300"}`}
            type="button"
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              setSaving(true);
              setError(null);
              try {
                // Envia payload com os campos solicitados pela API: { texto, titulo }
                const resp = await createDiario({ texto: value, titulo: title });
                // Se a API retorna { success: true, entrada: { ... } }, extrai a entrada
                const created = (resp && (resp.entrada ?? resp)) as any;
                // Se a API sinaliza falha, lança para cair no catch
                if (resp && typeof resp.success !== 'undefined' && !resp.success) {
                  throw new Error(resp.message || 'Erro ao criar entrada');
                }
                onSave?.(created);
                onClose();
              } catch (err: any) {
                console.error('Erro ao salvar diário (modal):', err);
                setError(err?.message || 'Erro ao salvar diário');
              } finally {
                setSaving(false);
              }
            }}
            className={`rounded-xl px-6 py-3 font-semibold transition-colors flex items-center gap-2
              ${theme === "dark" ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            type="button"
            disabled={saving || value.trim().length === 0}
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
