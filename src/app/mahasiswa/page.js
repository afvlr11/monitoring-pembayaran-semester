import StudentTable from "@/components/StudentTable"
import DashboardCards from "@/components/dashboardcard";

async function getMahasiswa() {
  const res = await fetch("http://localhost:3000/api/mahasiswa", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MahasiswaPage() {
  const mahasiswa = await getMahasiswa();

   return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Sistem Informasi Pembayaran Semester Mahasiswa
      </h1>

      {/* Dashboard */}
      <DashboardCards />

      {/* Judul tabel */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Data Mahasiswa
      </h2>

      {/* Tabel */}
      <StudentTable data={mahasiswa} />
    </div>
  );
}