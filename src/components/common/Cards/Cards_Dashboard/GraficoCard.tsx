"use client";

import BaseCard from "./BaseCard";
import Image from "next/image";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { name: "10/07", valor: 8 },
  { name: "11/07", valor: 9 },
  { name: "12/07", valor: 2 },
  { name: "13/07", valor: 7 },
  { name: "14/07", valor: 8 },
  { name: "15/07", valor: 6 },
  { name: "16/07", valor: 7.5 },
];

const media = (
  data.reduce((acc, cur) => acc + cur.valor, 0) / data.length
).toFixed(1);
const melhorDiaIdx = data.reduce(
  (best, val, idx, arr) => (val.valor > arr[best].valor ? idx : best),
  0,
);
const melhorDia = data[melhorDiaIdx];

type DotPositionProps = { cx?: number; cy?: number; size?: number };

function CustomDot(props: DotPositionProps) {
  const { cx, cy, size: sizeProp } = props;
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  const size = typeof sizeProp === "number" ? sizeProp : 18;
  const half = size / 2;
  return (
    <image
      href="/images/icons/DotGrafico.svg"
      x={cx - half}
      y={cy - half}
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}

export default function GraficoCard() {
  return (
    <BaseCard>
      <div className="mb-4 flex-shrink-0">
        <div className="text-[20px] font-semibold text-white">
          Seu Bem-Estar Esta Semana
        </div>
        <div className="text-lg font-semibold text-white">
          Média: {media} <span className="text-gray-300 mx-2">|</span>
          Melhor dia: {melhorDia.valor.toFixed(1)} (
          {["dom", "seg", "ter", "qua", "qui", "sex", "sab"][melhorDiaIdx % 7]})
        </div>
      </div>
      <div className="flex-1 min-h-0 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
          >           
            <CartesianGrid stroke="rgba(59, 130, 246, 0.15)" vertical={true} />
            <XAxis
              dataKey="name"
              stroke="#aaa"
              interval={0}
              tick={{ fontSize: 12, fontWeight: "regular" }}
              scale="point"
              padding={{ left: 0, right: 0 }}
              allowDuplicatedCategory={false}
            />
            <YAxis
              stroke="#aaa"
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              interval={0}
              tick={{ fontSize: 12, fontWeight: "regular" }}
              width={22}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e344e",
                borderRadius: "10px",
                border: "none",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#0890B1"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={<CustomDot size={22} />}
            />
            <Legend
              verticalAlign="bottom"
              content={() => (
                <div className="flex justify-center mt-0 text-blue-300 text-sm">
                  <div className="flex items-center">
                    <Image src="/images/icons/DotGrafico.svg" alt="Ponto" width={15} height={15} className="mr-2" />
                    Esta semana
                  </div>
                </div>
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </BaseCard>
  );
}
