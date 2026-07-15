"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMahasiswa() {

  const { id } = useParams();
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState(null);
  const [totalBayar, setTotalBayar] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/mahasiswa/${id}`);
      const data = await res.json();

      setMahasiswa(data);
      setTotalBayar(data.total_bayar);
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/mahasiswa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_bayar: Number(totalBayar),
      }),
    })
    const data = await res.json();

    console.log(data);

    setMahasiswa(data);
    setTotalBayar(data.total_bayar);

    const result = await res.json();

    alert(result.message);

    router.push("/mahasiswa");
    router.refresh();
  }

  if (!mahasiswa) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-5">
        Edit Pembayaran
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nama Mahasiswa</label>
          <input
            value={mahasiswa.nama}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"/>
        </div>

        <div>
          <label>Biaya Semester</label>
          <input
            value={mahasiswa.biaya_semester}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"/>
        </div>

        <div>
          <label>Total Bayar</label>
          <input
            type="number"
            value={totalBayar}
            onChange={(e) => setTotalBayar(e.target.value)}
            className="w-full border p-2 rounded"/>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan
        </button>
      </form>
    </div>
  );
}