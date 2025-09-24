"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useTheme } from "@/contexts/ThemeContext";


export default function Home() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div>
      <Sidebar />
    </div> 
  );
}
