import BaseCard from "./BaseCard";

export default function QuestionarioCard() {
  return (
    <BaseCard title="Questionário">
      <p className="text-gray-300 text-sm">
        Último questionário respondido em <span className="font-medium">--/--/----</span>
      </p>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition">
        Responder agora
      </button>
    </BaseCard>
  );
}
