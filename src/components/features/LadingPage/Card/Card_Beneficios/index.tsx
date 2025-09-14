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
    <div>
      <Image
        src={props.icon}
        alt={props.title}
        width={32}
        height={32}
        className="mb-4"
      />
      <h3
        className={`text-lg font-semibold ${darkMode ? "text-slate-50" : "text-slate-900"}`}
      >
        {props.title}
      </h3>
      <p
        className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
      >
        {props.parag}
      </p>
    </div>
  );
}
