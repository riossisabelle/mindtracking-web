import React from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode | string;
  iconClassName?: string;
}

const IconInput: React.FC<IconInputProps> = ({ label, icon, iconClassName, ...props }) => {
  const { theme } = useTheme(); // Obtém o tema atual do contexto

  return (
    <div
      className={`flex items-center lg:w-[412px] lg:h-[53px] px-3 py-2 border-2 rounded-xl ${
        theme === "dark"
          ? "bg-gray-800 border-blue-600 text-slate-50"
          : "bg-gray-200 border-blue-900 text-gray-800"
      }`}
    >
      {typeof icon === "string" ? (
        <Image
          src={icon}
          alt="icon"
          width={20}
          height={20}
          className={iconClassName}
        />
      ) : (
        icon || <User className={`w-5 h-5 ${theme === "dark" ? "text-slate-50" : "text-gray-800"} ${iconClassName}`} />
      )}

      <input
        {...props}
        placeholder={label}
        className={`w-full font-bold text-[15.37px] ml-1.5 bg-transparent placeholder-opacity-50 focus:outline-none ${
          theme === "dark" ? "text-slate-50 placeholder-white" : "text-gray-800 placeholder-slate-900"
        }`}
      />
    </div>
  );
};

export default IconInput;
