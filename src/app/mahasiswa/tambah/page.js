"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahMahasiswa() {
  const router = useRouter();

  const [form, setForm] = useState({
    nim: "",
    nama: "",
    prodi: "",
    angkatan: "",
    status: "Lunas",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/mahasiswa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Data berhasil ditambahkan!");
      router.push("/mahasiswa");
      router.refresh();
    } else {
      alert("Gagal menambahkan data.");
    }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        Tambah Mahasiswa
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nim"
          placeholder="NIM"
          value={form.nim}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required/>

        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required/>

        <input
          type="text"
          name="prodi"
          placeholder="Prodi"
          value={form.prodi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required/>

        <input
          type="number"
          name="angkatan"
          placeholder="Angkatan"
          value={form.angkatan}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required/>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded">
          <option value="Lunas">Belum Bayar</option>
          <option value="Belum Lunas">Belum Lunas</option>
          <option value="Belum Bayar">Lunas</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan
        </button>
      </form>
    </div>
  );
}