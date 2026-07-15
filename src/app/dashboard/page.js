import DashboardCards from "@/components/dashboardcard";
import PaymentBarChart from "@/components/PaymentBarChart";
import PaymentPieChart from "@/components/PaymentPieChart";
import StatisticsInsight from "@/components/StatisticsInsight";

export default function DashboardPage() {
  return (
  <div className="p-8 bg-slate-100 min-h-screen">
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        📊 Dashboard
      </h1>

      <p className="text-gray-500">
        Statistik pembayaran semester mahasiswa
      </p>
    </div>

    <DashboardCards />

    <div className="grid lg:grid-cols-2 gap-6 mt-8">
      <PaymentBarChart />
      <PaymentPieChart />
    </div>

    <StatisticsInsight />


      {/* Ringkasan */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          📈 Ringkasan Statistik
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="border rounded-xl p-4 bg-blue-50">
            <h3 className="font-semibold text-blue-700 mb-2">
              📊 Analisis Data
            </h3>

            <p className="text-gray-700">
              Dashboard menampilkan statistik pembayaran
              mahasiswa secara real-time berdasarkan data
              yang tersimpan di database MySQL.
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-green-50">
            <h3 className="font-semibold text-green-700 mb-2">
              💰 Informasi Pembayaran
            </h3>

            <p className="text-gray-700">
              Setiap perubahan pembayaran akan langsung
              memperbarui statistik dan grafik secara otomatis.
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-yellow-50">
            <h3 className="font-semibold text-yellow-700 mb-2">
              📌 Tujuan Sistem
            </h3>

            <p className="text-gray-700">
              Mempermudah pengelolaan data mahasiswa
              serta memantau status pembayaran semester.
            </p>
          </div>

          <div className="border rounded-xl p-4 bg-red-50">
            <h3 className="font-semibold text-red-700 mb-2">
              📈 Hasil Analisis
            </h3>

            <p className="text-gray-700">
              Grafik digunakan untuk melihat perbandingan
              jumlah mahasiswa berdasarkan status pembayaran.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}