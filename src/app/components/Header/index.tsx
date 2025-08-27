"use client";

import DarkModeToggle from "../ButtonColors/index";
import { useTheme } from "../ThemeProvider";

export default function Header() {
  const { darkMode, setDarkMode } = useTheme(); // usa o contexto global

  return (
    <header
      className={`w-full h-[100px] flex items-center transition-colors duration-500
      ${darkMode ? "bg-[#0C1324]" : "bg-gray-100"}
      px-6 sm:px-10 lg:px-[150px]`}
    >
      {/* Container geral: muda comportamento no mobile */}
      <div className="flex w-full items-center justify-center sm:justify-between">
        
        {/* Logo + Texto */}
        <div className="flex items-center gap-3">
          <img
            src="/images/icons/Logo.svg"
            alt="Logo"
            className="h-10 dark:invert"
          />
          <span
            className={`font-bold font-Inter text-[22px] sm:text-[26px] lg:text-[28px] ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            MindTracking
          </span>
        </div>

        {/* Botão aparece já no sm (tablet) */}
        <div className="hidden sm:flex">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </header>
  );
}
