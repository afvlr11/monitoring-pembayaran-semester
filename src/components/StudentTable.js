"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import StatusBadge from "./statusbadge";
import PaymentModal from "./PaymentModal";

export default function StudentTable({ data }) {
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Membuka modal
  function bukaModal(mahasiswa) {
    setSelectedMahasiswa(mahasiswa);
    setOpenModal(true);
  }

  // Simpan pembayaran
  async function simpanPembayaran(totalBayar) {
    if (!selectedMahasiswa) return;

    const res = await fetch(`/api/mahasiswa/${selectedMahasiswa.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_bayar: totalBayar,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }

    setOpenModal(false);
    setSelectedMahasiswa(null);

    window.location.reload();
  }

  // Hapus mahasiswa
  async function hapusMahasiswa() {
  setLoadingDelete(true);

  const res = await fetch(`/api/mahasiswa/${selectedId}`, {
    method: "DELETE",
  });

  const result = await res.json();

  setLoadingDelete(false);

  if (!res.ok) {
    alert(result.message);
    return;
  }

  setShowDeleteModal(false);

  window.location.reload();
}

  // Search
  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.nim.toLowerCase().includes(keyword) ||
      item.prodi.toLowerCase().includes(keyword)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between p-5 border-b">
          <input
            type="text"
            placeholder="🔍 Cari NIM, Nama, atau Prodi..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => router.push("/mahasiswa/tambah")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            ➕ Tambah Mahasiswa
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="text-left p-4 w-[35%]">
                  Mahasiswa
                </th>

                <th className="text-left p-4 w-[35%]">
                  Pembayaran
                </th>

                <th className="text-center p-4">
                  Status
                </th>

                <th className="text-center p-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>

              {currentData.map((item) => {

                const sisa = Math.max(
                  0,
                  item.biaya_semester - item.total_bayar
                );

                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50 align-top"
                  >

                    {/* Mahasiswa */}
                    <td className="p-5">
                      <p className="font-bold text-lg">
                        👤 {item.nama}
                      </p>

                      <p className="text-gray-600">
                        {item.nim}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.prodi} • {item.angkatan}
                      </p>
                    </td>

                    {/* Pembayaran */}
                    <td className="p-5">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Semester
                          </span>

                          <span className="font-semibold">
                            Rp{" "}
                            {item.biaya_semester.toLocaleString("id-ID")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-green-600">
                            Dibayar
                          </span>

                          <span className="font-semibold text-green-600">
                            Rp{" "}
                            {item.total_bayar.toLocaleString("id-ID")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-red-500">
                            Sisa
                          </span>

                          <span className="font-semibold text-red-500">
                            Rp {sisa.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="text-center align-middle">
                      <StatusBadge
                        totalBayar={item.total_bayar}
                        biayaSemester={item.biaya_semester}
                      />
                    </td>

                    {/* Aksi */}
                    <td className="text-center align-middle">
                      <div className="flex flex-col gap-2 items-center">
                        <button
                          onClick={() => bukaModal(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-28"
                        >
                          💳 Bayar
                        </button>

                        <button
                          onClick={() => {
                            setSelectedId(data.id);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-28"
                        >
                          🗑 Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {currentData.map((item) => {

              const sisa = Math.max(
                0,
                item.biaya_semester - item.total_bayar
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">
                        👤 {item.nama}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {item.nim}
                      </p>

                      <p className="text-gray-500 text-sm">
                        {item.prodi} • {item.angkatan}
                      </p>
                    </div>

                    <StatusBadge
                      totalBayar={item.total_bayar}
                      biayaSemester={item.biaya_semester}
                    />
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Biaya Semester
                      </span>

                      <span className="font-semibold">
                        Rp{" "}
                        {item.biaya_semester.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-green-600">
                        Dibayar
                      </span>

                      <span className="font-semibold text-green-600">
                        Rp{" "}
                        {item.total_bayar.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-red-500">
                        Sisa
                      </span>

                      <span className="font-semibold text-red-500">
                        Rp{" "}
                        {sisa.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => bukaModal(item)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                      💳 Bayar
                    </button>

                    <button
                      onClick={() => hapusMahasiswa(item.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                    >
                      🗑 Hapus
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredData.length === 0 && (

              <div className="text-center py-10 text-gray-500">
                Data mahasiswa tidak ditemukan.
              </div>
            )}
          </div>

          {/* Pagination */}

          {filteredData.length > 0 && (

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-t">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
                className="w-full md:w-auto px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                ← Sebelumnya
              </button>

              <span className="font-semibold">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
                Berikutnya →
              </button>
            </div>
          )}
          </div>

          <PaymentModal
            open={openModal}
            mahasiswa={selectedMahasiswa}
            onClose={() => {
              setOpenModal(false);
              setSelectedMahasiswa(null);
            }}
            onSave={simpanPembayaran}/>

            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-87.5 p-6">
                  <h2 className="text-xl font-bold mb-2">
                    Hapus Mahasiswa
                  </h2>

                  <p className="text-gray-600 mb-6">
                    Yakin ingin menghapus data mahasiswa ini?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 rounded-lg border">
                      Batal
                    </button>

                    <button
                      onClick={hapusMahasiswa}
                      disabled={loadingDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
                      {loadingDelete ? "Menghapus..." : "Hapus"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
          );
        }