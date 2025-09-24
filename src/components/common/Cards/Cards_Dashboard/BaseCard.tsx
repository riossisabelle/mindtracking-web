import { ReactNode } from "react";

interface BaseCardProps {
  title: string;
  children: ReactNode;
}

export default function BaseCard({ title, children }: BaseCardProps) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-5 border border-gray-700 hover:border-blue-500 transition">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}
