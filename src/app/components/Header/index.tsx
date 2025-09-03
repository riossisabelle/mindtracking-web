"use client";

import DarkModeToggle from "../ButtonColors/index";
import { useTheme } from "./../../contexts/ThemeContext";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme(); // agora usa toggleTheme corretamente

  return (
    <header className="w-full h-[100px] flex items-center transition-colors duration-500 bg-transparent">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-center sm:justify-between px-6 sm:px-[150px]">
        
        {/* Logo + Texto */}
        <div className="flex items-center gap-3">
          <img
            src="/images/icons/Logo.svg"
            alt="Logo"
            className="h-10"
          />
          <span
            className={`font-bold font-Inter text-[22px] sm:text-[26px] lg:text-[28px] ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            MindTracking
          </span>
        </div>

        {/* Botão só aparece em tablet/desktop */}
        <div className="hidden sm:flex">
          <DarkModeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
