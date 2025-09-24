"use client";

import BaseCard from "./BaseCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Seg", humor: 10 },
  { name: "Ter", humor: 4 },
  { name: "Qua", humor: 2 },
  { name: "Qui", humor: 9 },
  { name: "Sex", humor: 3 },
];

export default function GraficoCard() {
  return (
    <BaseCard>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="humor" stroke="#3b82f6" strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </BaseCard>
  );
}
