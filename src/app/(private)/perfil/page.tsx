"use client";

import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import EditProfileModal from "@/components/common/Modals/perfil/editarPerfil";
import DeleteAccountModal from "@/components/common/Modals/perfil/deletarConta";
import VerifyCodeModal from "@/components/features/Auth/RedefinicaoSenha/VerificacaoCodigo";
import ResetPasswordModal from "@/components/features/Auth/RedefinicaoSenha/AtualizacaoSenha";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dadosUser, recuperarSenha } from "@/lib/api/auth";
import api from "@/lib/api/axios";

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

export default function PerfilPage() {
  const { darkMode } = useTheme();
  const { updateUserData } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyCodeModalOpen, setVerifyCodeModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [userData, setUserData] = useState<{
    id?: number | string;
    nome?: string;
    email?: string;
    data_nascimento?: string | null;
    idade?: number | null;
    telefone?: string | null;
    genero?: string | null;
    foto_perfil_url?: string | null;
    foto_fundo_url?: string | null;
  } | null>(null);

  const [fotoPerfilUrl, setFotoPerfilUrl] = useState<string | null>(null);
  const [fotoFundoUrl, setFotoFundoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userString = localStorage.getItem("mt_user");
        if (userString) {
          const user = JSON.parse(userString);
          setEmailUser(user.email || "");
        }
      } catch (err) {
        console.error("Erro ao carregar mt_user:", err);
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await dadosUser();
        setUserData(resp?.user ?? null);

        if (resp?.user?.foto_perfil_url)
          setFotoPerfilUrl(resp.user.foto_perfil_url);
        if (resp?.user?.foto_fundo_url)
          setFotoFundoUrl(resp.user.foto_fundo_url);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setUserData(null);
      }
    };
    load();
  }, []);

  const handleAccountDeleted = () => {
    console.log("Conta deletada");
    setDeleteAccountModalOpen(false);
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const userDataString = localStorage.getItem("mt_user");
      if (!userDataString) throw new Error("Dados do usuário não encontrados");

      const userData = JSON.parse(userDataString);
      if (!userData.email)
        throw new Error("Email não encontrado nos dados do usuário");

      await recuperarSenha({ email: userData.email });
      setVerifyCodeModalOpen(true);
    } catch (error) {
      console.error("Erro ao enviar código:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase();
    const second = parts.length > 1 ? parts[1]?.charAt(0).toUpperCase() : "";
    return `${first}${second}`;
  };

  const formatTelefone = (telefone: string | null | undefined) => {
    if (!telefone) return "—";
    const digits = telefone.replace(/\D/g, "");
    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return telefone;
  };

  const capitalize = (text: string | null | undefined) => {
    if (!text) return "—";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const cardClasses = `rounded-2xl shadow-xl overflow-hidden transition-colors duration-700 ${
    darkMode
      ? "bg-slate-800 text-white"
      : "bg-slate-50 text-gray-900 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.10)]"
  }`;

  const fieldClasses = `p-4 rounded-lg transition-colors duration-300 ${
    darkMode ? "bg-[#29374F] text-gray-300" : "bg-[#EFEFEF] text-gray-600"
  }`;

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    console.log("CLOUDINARY_CLOUD_NAME:", CLOUDINARY_CLOUD_NAME);
    console.log("CLOUDINARY_UPLOAD_PRESET:", CLOUDINARY_UPLOAD_PRESET);
    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          "Cloudinary upload error status:",
          res.status,
          res.statusText,
        );
        console.error("Cloudinary upload error response:", errorText);
        throw new Error("Erro no upload");
      }

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Erro upload Cloudinary:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  type UpdateFotoPayload = Partial<{
    foto_perfil_url: string;
    foto_fundo_url: string;
  }>;

  const updateFotoUsuario = async (body: UpdateFotoPayload) => {
    try {
      const resp = await api.put("/auth/profile", body);

      if (resp.status !== 200) {
        console.error("Erro ao atualizar foto no backend", resp);
      }
    } catch (error) {
      console.error("Erro na chamada backend:", error);
    }
  };

  const handleFotoPerfilChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const url = await uploadToCloudinary(e.target.files[0]);
      if (url) {
        setFotoPerfilUrl(url);
        await updateFotoUsuario({ foto_perfil_url: url });
        // Atualiza imediatamente o contexto para refletir na Sidebar
        updateUserData({ fotoPerfil: url });
      }
    }
  };

  const handleFotoFundoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const url = await uploadToCloudinary(e.target.files[0]);
      if (url) {
        setFotoFundoUrl(url);
        await updateFotoUsuario({ foto_fundo_url: url });
      }
    }
  };

  const ProfileCard = (
    <>
      <div className={cardClasses}>
        <div
          className={`relative w-full h-32 md:h-40 ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {fotoFundoUrl ? (
            <Image
              src={fotoFundoUrl}
              alt="Foto de Fundo"
              fill
              className="object-cover object-bottom"
            />
          ) : (
            <Image
              src="/images/paisagem.png"
              alt="Foto paisagem"
              fill
              className="object-cover object-bottom"
            />
          )}

          <label className="absolute top-3 right-3 cursor-pointer z-10 inline-flex items-center justify-center rounded-full bg-blue-600 p-2 hover:bg-blue-700">
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoFundoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Image
              src="/images/icons/camera.svg"
              alt="camera"
              width={14}
              height={14}
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row items-start px-6 mt-6 relative">
          <div className="flex flex-col items-center md:items-start -mt-16 z-10">
            <div className="relative">
              <Avatar
                className={`w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 text-2xl md:text-3xl lg:text-4xl font-bold border-4 relative overflow-hidden ${
                  darkMode
                    ? "border-slate-800 bg-blue-600 text-white"
                    : "border-slate-50 bg-blue-600 text-white"
                }`}
              >
                {fotoPerfilUrl ? (
                  <Image
                    src={fotoPerfilUrl}
                    alt="Foto de Perfil"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getUserInitials(userData?.nome ?? "")}
                  </AvatarFallback>
                )}
              </Avatar>

              <label className="absolute bottom-2 right-2 cursor-pointer z-10 inline-flex items-center justify-center rounded-full bg-blue-600 p-2 hover:bg-blue-700">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoPerfilChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Image
                  src="/images/icons/editar.svg"
                  alt="editar"
                  width={14}
                  height={14}
                />
              </label>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">
              {userData?.nome ?? "Usuário"}
            </h2>
          </div>

          <div className="mt-6 md:mt-0 ml-auto z-10 w-full md:w-auto flex flex-col md:flex-row gap-2 md:gap-3">
            <button
              className="min-w-[120px] w-full sm:w-auto bg-blue-600 px-6 h-9  rounded-full font-bold hover:bg-blue-700 text-white whitespace-nowrap text-center"
              onClick={() => setModalOpen(true)}
            >
              Editar Perfil
            </button>

            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="min-w-[120px] w-full sm:w-auto bg-blue-600 px-6  h-9 rounded-full font-bold hover:bg-blue-700 text-white text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Redefinir Senha"}
            </button>

            <button
              className="min-w-[120px] w-full sm:w-auto bg-red-600 px-6 h-9 rounded-full font-bold hover:bg-red-700 text-white whitespace-nowrap text-center"
              onClick={() => setDeleteAccountModalOpen(true)}
            >
              Deletar Conta
            </button>
          </div>
        </div>

        <hr
          className={`my-4 mx-6 mb-0 border-t ${
            darkMode ? "border-gray-600" : "border-gray-300"
          }`}
        />

        <div className="px-6 md:px-8 lg:-mx-8 xl:-mx-2 2xl:-mx-2 gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 lg:gap-x-14 py-8">
            <div className={fieldClasses}>
              <p className="text-base lg:text-lg font-semibold opacity-60 mb-2">
                Gênero
              </p>
              <p className="text-lg font-semibold dark:text-white text-black">
                {capitalize(userData?.genero ?? "")}
              </p>
            </div>
            <div className={fieldClasses}>
              <p className="text-base lg:text-lg font-semibold opacity-60 mb-2">
                Idade
              </p>
              <p className="text-lg font-semibold dark:text-white text-black">
                {userData?.idade ? `${userData.idade} Anos` : "—"}
              </p>
            </div>
            <div className={fieldClasses}>
              <p className="text-base lg:text-lg font-semibold opacity-60 mb-2">
                Telefone
              </p>
              <p className="text-lg font-semibold dark:text-white text-black">
                {formatTelefone(userData?.telefone)}
              </p>
            </div>
            <div className={fieldClasses}>
              <p className="text-base lg:text-lg font-semibold opacity-60 mb-2">
                E-mail
              </p>
              <p className="text-lg font-semibold dark:text-white text-black">
                {userData?.email ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
        onDelete={handleAccountDeleted}
      />
      <EditProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <VerifyCodeModal
        isOpen={verifyCodeModalOpen}
        onClose={() => setVerifyCodeModalOpen(false)}
        onSuccess={() => {
          setVerifyCodeModalOpen(false);
          setChangePasswordModalOpen(true);
        }}
        email={emailUser}
        submitButtonId="code-submit"
      />
      <ResetPasswordModal
        isOpen={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
        onSuccess={() => setChangePasswordModalOpen(false)}
        email={emailUser}
        submitButtonId="password-submit"
      />
    </>
  );

  return (
    <div className="min-h-screen transition-colors duration-300 bg-transparent">
      <div className="sm:hidden fixed top-0 left-0 w-full z-50">
        <Sidebar />
      </div>

      <div className="hidden sm:flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 pt-10 md:pt-14 pb-10 md:justify-center ml-0 lg:ml-37.5">
          <div className="w-full max-w-5xl mx-auto">{ProfileCard}</div>
        </div>
      </div>

      <div className="sm:hidden px-5 pb-6 pt-[88px] md:pt-3">{ProfileCard}</div>
    </div>
  );
}
