"use client";
import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
}

export default function BaseCard({ children, className }: BaseCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        rounded-[8px]
        pl-[20px] pr-[20px] pt-[20px]
        w-full h-full flex flex-col min-h-[150px] max-w-[500px]
        transition-colors
        ${
          isDark
            ? "bg-slate-800"
            : "bg-slate-50 shadow-[0_8px_15px_0_rgba(0,0,0,0.20)]"
        }
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
}

