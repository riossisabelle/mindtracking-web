"use client";

import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Diario from "../components/layout/Diario";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar />

      {/* ÚNICO MAIN */}
      <main className="flex-1 mt-25 lg:ml-37.5 md:mt-25 ">
        <Diario />
      </main>
    </div>
  );
}
