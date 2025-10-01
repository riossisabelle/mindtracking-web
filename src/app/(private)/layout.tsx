"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}


