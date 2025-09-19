import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, VenusAndMars } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Interface e opções permanecem as mesmas
interface GenderOption {
  value: string;
  label: string;
}

const GENDER_OPTIONS: GenderOption[] = [
  { value: "male", label: "Homem" },
  { value: "female", label: "Mulher" },
  { value: "other", label: "Outro" },
];

export default function GenderSelect({ error }: { error?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<GenderOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isError = Boolean(error);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: GenderOption) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative md:w-[412px] sm:w-[290px]">
      <div
        className={`flex items-center w-full h-[53px] px-3 py-2 border-2 rounded-xl ${
          isError
            ? "border-red-500"
            : theme === "dark"
            ? "bg-gray-800 border-blue-600 text-slate-50"
            : "bg-gray-200 border-blue-900 text-gray-800"
        }`}
      >
        <button
          type="button"
          onClick={toggleDropdown}
          className={`flex w-full items-center justify-between font-bold text-[15.37px]  bg-transparent focus:outline-none ${
            theme === "dark" ? "text-slate-50" : "text-gray-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <VenusAndMars size={24} />
            {/* Corrigido estilo do placeholder para ser menos destacado */}
            <span className={selectedValue ? "" : `font-bold ${theme === "dark" ? "text-slate-50" : "text-gray-900"}`}>
              {selectedValue ? selectedValue.label : "Gênero"}
            </span>
          </div>
          <ChevronDown
            className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            size={22}
          />
        </button>
      </div>

      {/* A lista de opções */}
      {isOpen && (
        // 👇 ALTERAÇÕES FEITAS AQUI 👇
        <div className={`absolute bottom-full mb-2 w-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-50"} border border-slate-900 dark:border-slate-600 ${theme === "dark" ? "text-slate-50" : "text-gray-900"} rounded-lg shadow-lg z-20`}>
          <ul>
            {GENDER_OPTIONS.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className="px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer font-semibold"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}