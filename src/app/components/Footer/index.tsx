"use client";

import { useTheme } from "../ThemeProvider";

export default function Footer() {
  const { darkMode } = useTheme(); // pega do contexto global

  return (
    <footer
      className={`w-full border-t-2 transition-colors duration-500
      ${darkMode ? "bg-[#0e1e32] text-white border-blue-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col px-6 sm:px-12 md:px-[150px] py-[50px]">
        
        {/* Título MindTracking com logo */}
        <div className="flex items-center gap-3 mb-10">
          <img 
            src={darkMode ? "/images/icons/logo_branca.svg" : "/images/icons/Logo.svg"}
            alt="Logo MindTracking"
            className="h-10 w-10 object-cover"
          />
          <h1 className="font-bold text-[28px]">MindTracking</h1>
        </div>

        {/* Seções Explore e Entre em Contato + Athena */}
        <div className="flex flex-col md:flex-row mb-8 w-full gap-6">
          
          {/* Explore */}
          <div className="flex flex-col space-y-4 md:w-[20%]">
            <h2 className="font-semibold text-xl">Explore</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-600">Home</a></li>
              <li><a href="#" className="text-sm hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-blue-600">Questões</a></li>
            </ul>
          </div>

          {/* Entre em Contato */}
          <div className="flex flex-col space-y-4 md:w-1/4">
            <h2 className="font-semibold text-xl">Entre em Contato</h2>
            <ul className="space-y-2">
              <li className="text-sm whitespace-nowrap">
                whatsapp: <span>[11] 9 4996-3686</span>
              </li>
              <li className="text-sm whitespace-nowrap">
                email: <span>suporte.mindtracking@gmail.com</span>
              </li>
            </ul>
{/* Redes sociais */}
<div className="flex flex-col space-y-5 mt-2">
  <h2 className="font-semibold text-lg whitespace-nowrap">
    Nossas Redes & Comunidades
  </h2>
  <div className="flex space-x-18">
    <a
      href="#"
      className="w-9 h-9 flex items-center justify-center rounded-full 
                 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600"
    >
      <img
        src={
          darkMode
            ? "/images/icons/facebook.svg"
            : "/images/icons/facebook_p.svg"
        }
        alt="Facebook"
        className="w-full h-full object-contain"
      />
    </a>
    <a
      href="#"
      className="w-9 h-9 flex items-center justify-center rounded-full 
                 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600"
    >
      <img
        src={
          darkMode
            ? "/images/icons/instagram.svg"
            : "/images/icons/instagram_p.svg"
        }
        alt="Instagram"
        className="w-full h-full object-contain"
      />
    </a>
    <a
      href="#"
      className="w-9 h-9 flex items-center justify-center rounded-full 
                 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600"
    >
      <img
        src={darkMode ? "/images/icons/x.svg" : "/images/icons/x_p.svg"}
        alt="X"
        className="w-full h-full object-contain"
      />
    </a>
  </div>
</div>

          </div>

          {/* Athena + Texto + Botão */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-1/2">
            {/* Athena */}
            <div className="hidden md:flex justify-center md:justify-start self-start md:-mt-8 lg:-mt-16 ml-6">
              <img 
                src="/images/athena4.png" 
                alt="Athena" 
                className="object-contain w-[30rem] -mt-5" 
              />
            </div>

            {/* Texto + botão */}
            <div className="flex flex-col items-center md:items-start space-y-4 max-w-[400px] text-center md:text-left md:-ml-12 -mt-24">
              <h2 className="font-semibold text-2xl leading-snug">
                Pronto para conhecer seu espaço emocional?
              </h2>
              <a 
                href="#" 
                className="bg-blue-600 text-white px-12 py-2.5 rounded-full font-semibold text-base hover:bg-blue-500"
              >
                Comece Agora
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-left text-xs text-gray-500 dark:text-gray-400 -mt-10 w-full">
          <p>© 2025. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
