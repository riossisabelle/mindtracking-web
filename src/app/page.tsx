"use client";
import { useTheme } from "../contexts/ThemeContext";


export default function Home() {
  const { theme } = useTheme();


  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
    </div>
  );
}
