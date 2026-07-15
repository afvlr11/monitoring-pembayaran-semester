"use client";

import { useState, useEffect } from "react";

export default function PaymentModal({
  open,
  onClose,
  mahasiswa,
  onSave,
}) {
  const [nominalBayar, setNominalBayar] = useState("");

  useEffect(() => {
    if (mahasiswa) {
      setNominalBayar("");
    }
  }, [mahasiswa]);

  if (!open || !mahasiswa) return null;

  const sudahDibayar = Number(mahasiswa.total_bayar);
  const nominal = Number(nominalBayar) || 0;

  const totalBaru = sudahDibayar + nominal;
  const sisa = mahasiswa.biaya_semester - totalBaru;

  let status = "Belum Bayar";

  if (totalBaru >= mahasiswa.biaya_semester) {
    status = "Lunas";
  } else if (totalBaru > 0) {
    status = "Belum Lunas";
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-112.5 p-6">

        <h2 className="text-2xl font-bold mb-5">
          💳 Pembayaran Semester
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">Nama</p>
            <p className="font-semibold">{mahasiswa.nama}</p>
          </div>

          <div>
            <p className="text-gray-500">NIM</p>
            <p className="font-semibold">{mahasiswa.nim}</p>
          </div>

          <div>
            <p className="text-gray-500">Biaya Semester</p>
            <p className="font-semibold">
              Rp {mahasiswa.biaya_semester.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Sudah Dibayar</p>
            <p className="font-semibold text-green-600">
              Rp {sudahDibayar.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Nominal Pembayaran
            </label>

            <input
              type="number"
              value={nominalBayar}
              onChange={(e) => setNominalBayar(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Masukkan nominal pembayaran"
            />
          </div>

          <div>
            <p className="text-gray-500">Total Setelah Pembayaran</p>
            <p className="font-semibold text-blue-600">
              Rp {totalBaru.toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Sisa Pembayaran</p>
            <p className="font-bold text-red-500">
              Rp {Math.max(0, sisa).toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-white font-semibold ${
                status === "Lunas"
                  ? "bg-green-500"
                  : status === "Belum Lunas"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500"
              }`}
            >
              {status}
            </span>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Batal
          </button>

          <button
            onClick={() => onSave(totalBaru)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Simpan
          </button>

        </div>

      </div>
    </div>
  );
}