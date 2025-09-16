import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";

interface CardBeneficioProps {
  icon: string;
  title: string;
  parag: string;
}

export default function CardBeneficio(props: CardBeneficioProps) {
  const darkMode = useTheme();

  return (
    <div className="flex flex-row items-center justify-center gap-6 bg-[#0F172A1A] rounded-2xl border-2 border-blue-600 shadow-lg shadow-slate-800 p-4 md:p-7">
      <Image
        src={props.icon}
        alt={props.title}
        width={52}
        height={52}
        className={`bg-[#2563EA0D] rounded-full p-2 ${
          darkMode.darkMode ? "brightness-0 invert" : ""
        }`}
      />
      <div className="flex flex-col items-start gap-2">
        <h3
          className={`text-base md:text-lg font-semibold ${
            darkMode.darkMode ? "text-slate-50" : "text-slate-900"
          }`}
        >
          {props.title}
        </h3>
        <p
          className={`text-sm ${
            darkMode.darkMode ? "text-slate-50" : "text-slate-900"
          }`}
        >
          {props.parag}
        </p>
      </div>
    </div>
  );
}
