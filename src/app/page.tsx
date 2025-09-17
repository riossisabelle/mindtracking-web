"use client";

import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/layout/Sidebar";
import Questionnaire from "./(private)/Questionnaire";

export default function Home() {
  const { theme } = useTheme(); // Obtém o tema atual

  return (
    <div>
      <Sidebar />
      <main className="ml-0 lg:ml-34.5 ">
          <Questionnaire theme={theme} />
      </main>
    </div>
  );
}
