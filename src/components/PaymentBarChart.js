"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function PaymentBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getChart() {
      const res = await fetch("/api/dashboard/chart");
      const result = await res.json();

      setData(result);
    }

    getChart();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-6">
        📊 Grafik Status Pembayaran
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="name"/>

          <YAxis allowDecimals={false}/>

          <Tooltip/>

          <Bar
            dataKey="jumlah"
            fill="#2563eb"
            radius={[8,8,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}