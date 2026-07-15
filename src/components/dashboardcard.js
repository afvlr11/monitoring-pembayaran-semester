"use client";

import { useEffect, useState } from "react";

export default function DashboardCards() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setDashboard(data);
    }

    getData();
  }, []);

  if (!dashboard) {
    return (
      <div className="text-center py-10">
        Memuat dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Mahasiswa",
      value: dashboard.totalMahasiswa,
      color: "bg-blue-500",
      icon: "🎓",
    },
    {
      title: "Lunas",
      value: dashboard.lunas,
      color: "bg-green-500",
      icon: "🟢",
    },
    {
      title: "Belum Lunas",
      value: dashboard.belumLunas,
      color: "bg-yellow-400",
      icon: "🟡",
    },
    {
      title: "Belum Bayar",
      value: dashboard.belumBayar,
      color: "bg-red-500",
      icon: "🔴",
    },
    {
      title: "Total Uang Masuk",
      value: `Rp ${dashboard.totalMasuk.toLocaleString("id-ID")}`,
      color: "bg-indigo-500",
      icon: "💰",
    },
    {
      title: "Total Piutang",
      value: `Rp ${dashboard.totalPiutang.toLocaleString("id-ID")}`,
      color: "bg-pink-400",
      icon: "📄",
    },
  ];

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-xl shadow-lg p-5`}>
          <div className="text-3xl">{card.icon}</div>

          <p className="mt-3 text-sm opacity-90">
            {card.title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}