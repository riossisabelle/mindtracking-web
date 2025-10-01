import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, VenusAndMars } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface GenderOption {
  value: string;
  label: string;
}

interface GenderSelectProps {
  onChange: (value: string) => void;
  error?: string | null;
}

const GENDER_OPTIONS: GenderOption[] = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
  { value: "prefiro não dizer", label: "Prefiro não dizer" }
];

export default function GenderSelect({ onChange, error }: GenderSelectProps) {
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
    onChange(option.value);
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
    <div className="w-full">
      <div ref={dropdownRef} className="relative">
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
            className={`flex w-full items-center justify-between font-bold text-[15.37px] bg-transparent focus:outline-none ${
              theme === "dark" ? "text-slate-50" : "text-gray-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <VenusAndMars size={24} />
              <span className={selectedValue ? "" : `font-bold ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                {selectedValue ? selectedValue.label : "Selecione seu gênero"}
              </span>
            </div>
            <ChevronDown
              className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              size={22}
            />
          </button>
        </div>

        {/* A lista de opções - AGORA POSICIONADA ACIMA */}
        {isOpen && (
          <div className={`absolute bottom-full mb-1 w-full ${theme === "dark" ? "bg-slate-800" : "bg-slate-50"} border border-slate-900 dark:border-slate-600 ${theme === "dark" ? "text-slate-50" : "text-gray-900"} rounded-lg shadow-lg z-20`}>
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
      
      {/* Exibir mensagem de erro */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}