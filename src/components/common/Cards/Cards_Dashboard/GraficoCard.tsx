import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

const data = [
  { name: "10/07", valor: 8 },
  { name: "11/07", valor: 9 },
  { name: "12/07", valor: 6 },
  { name: "13/07", valor: 7 },
  { name: "14/07", valor: 8 },
  { name: "15/07", valor: 6 },
  { name: "16/07", valor: 10 },
];

export default function GraficoCard() {
  return (
    <div className="w-full">
      <div className="mb-3">
        <div className="text-lg font-semibold">Seu Bem-Estar Esta Semana</div>
        <div className="text-base font-medium text-white/90">
          Média: 7.7 <span className="mx-2 text-white">|</span>
          Melhor dia: 10.0 (sab)
        </div>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, left: 5, right: 10, bottom: 15 }}
          >
            <defs>
              <linearGradient id="colorBemEstar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#18293E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 0" opacity={0.17} />
            <XAxis dataKey="name" stroke="#d1e9ff" interval={0} />
            <YAxis stroke="#d1e9ff" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} interval={0} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e344e", border: "none", color: "#fff" }}
              labelStyle={{ color: "#38bdf8" }}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#38bdf8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBemEstar)"
              dot={{ stroke: "#38bdf8", strokeWidth: 2, r: 5, fill: "#18293E" }}
              activeDot={{ r: 8, fill: "#38bdf8", stroke: "#fff", strokeWidth: 3 }}
            />
            <Legend
              verticalAlign="bottom"
              content={() => (
                <div className="flex justify-center mt-0 text-blue-300 text-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-sky-400 rounded-full mr-2 inline-block" />
                    Esta semana
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
