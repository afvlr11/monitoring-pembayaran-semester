import Link from "next/link";

export default function HomePage() {
  return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-5xl w-full bg-pink-400 rounded-3xl shadow-2xl     overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">

          {/* Kiri */}
          <div className="p-10 text-white">

            <p className="text-lg mb-2">
              👋 Selamat Datang
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Sistem Informasi
              <br />
              Pembayaran Mahasiswa
            </h1>

            <p className="mt-5 text-blue-100 leading-7">
              Kelola data mahasiswa dan pembayaran semester
              dengan lebih cepat, mudah, dan efisien dalam
              satu sistem terintegrasi.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                href="/mahasiswa"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                👨‍🎓 Kelola Mahasiswa
              </Link>

              <Link
                href="/dashboard"
                className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition">
                📊 Dashboard
              </Link>
            </div>
          </div>

          {/* Kanan */}
          <div className="flex justify-center p-10">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-80">
              <div className="text-center">
                <div className="text-7xl mb-4">
                  🎓
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Sistem Akademik
                </h2>

                <p className="text-gray-500 mt-3">
                  Kelola pembayaran mahasiswa
                  dengan lebih rapi dan modern.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span>👨‍🎓 Data Mahasiswa</span>
                  <span className="font-bold text-green-600">
                    ✓
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>💳 Pembayaran</span>
                  <span className="font-bold text-green-600">
                    ✓
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>📊 Dashboard</span>
                  <span className="font-bold text-green-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}