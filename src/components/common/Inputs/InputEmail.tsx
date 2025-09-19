import React from "react";
import { User } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode | string;
  iconClassName?: string;
  error?: string | null;
  helperText?: string;

  width?: string;
  describedById?: string; // opcional para conectar aria-describedby externamente
}

const IconInput: React.FC<IconInputProps> = ({ label, icon, iconClassName, error, helperText, describedById, width, ...props }) => {

  const { theme } = useTheme();
  const isError = Boolean(error);
  const helperId = describedById || (helperText || isError ? `${props.id || props.name}-helper` : undefined);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center md:w-[412px] md:h-[53px] sm:w-[290px] sm:h-[53px] px-3 py-2 border-2 rounded-xl ${
          isError
            ? "border-red-500"
            : theme === "dark"
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
          aria-invalid={isError || undefined}
          aria-describedby={helperId}

          className={`${width} font-bold text-[15.37px] ml-1.5 bg-transparent placeholder-opacity-50 focus:outline-none ${

            theme === "dark" ? "text-slate-50 placeholder-white" : "text-gray-800 placeholder-slate-900"
          }`}
        />
      </div>

      {(helperText || isError) && (
        <p id={helperId} className={`text-xs ${isError ? "text-red-500" : theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
          {isError ? error : helperText}
        </p>
      )}
    </div>
  );
};

export default IconInput;
