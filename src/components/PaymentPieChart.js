"use client";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e", // Lunas
  "#facc15", // Belum Lunas
  "#ef4444", // Belum Bayar
];

export default function PaymentPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/dashboard/chart");
      const result = await res.json();

      setData(result);
    }

    getData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        🥧 Persentase Status Pembayaran
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={data}
            dataKey="jumlah"
            nameKey="name"
            outerRadius={120}
            label>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}