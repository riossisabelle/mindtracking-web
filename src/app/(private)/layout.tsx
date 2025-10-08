"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuestionnairePage = pathname === "/questionnaire";

  return (

    <div className="min-h-screen">
      {!isQuestionnairePage && <Sidebar />}
      <main className={isQuestionnairePage ? "w-full min-h-screen h-full" : "lg:ml-37.5 min-h-screen h-full transition-all duration-300"}>
        {children}
      </main>

    </div>
  );
}