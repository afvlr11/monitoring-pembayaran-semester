"use client";

import { useEffect, useState } from "react";

export default function StatisticsInsight() {
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
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        Memuat insight...
      </div>
    );
  }

  const persenLunas = (
    (dashboard.lunas / dashboard.totalMahasiswa) * 100 || 0
  ).toFixed(1);

  const persenBelumLunas = (
    (dashboard.belumLunas / dashboard.totalMahasiswa) * 100 || 0
  ).toFixed(1);

  const persenBelumBayar = (
    (dashboard.belumBayar / dashboard.totalMahasiswa) * 100 || 0
  ).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📈 Insight Statistik
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-700">
            🟢 Mahasiswa Lunas
          </h3>

          <p className="mt-2 text-gray-700">
            Sebanyak <b>{persenLunas}%</b> mahasiswa telah melunasi pembayaran semester.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-yellow-700">
            🟡 Belum Lunas
          </h3>

          <p className="mt-2 text-gray-700">
            Sebanyak <b>{persenBelumLunas}%</b> mahasiswa masih memiliki sisa pembayaran.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-700">
            🔴 Belum Bayar
          </h3>

          <p className="mt-2 text-gray-700">
            Sebanyak <b>{persenBelumBayar}%</b> mahasiswa belum melakukan pembayaran.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-700">
            💰 Kondisi Keuangan
          </h3>

          <p className="mt-2 text-gray-700">
            Total uang masuk sebesar
            <br />
            <b>
              Rp {dashboard.totalMasuk.toLocaleString("id-ID")}
            </b>
            <br /><br />
            Total piutang sebesar
            <br />
            <b>
              Rp {dashboard.totalPiutang.toLocaleString("id-ID")}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}