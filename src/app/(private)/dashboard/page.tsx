"use client";
import QuestionarioCard from "@/components/common/Cards/Cards_Dashboard/QuestionarioCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen md:ml-37.5 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuestionarioCard />

      </div>
    </div>
  );
}


