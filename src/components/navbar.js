"use client";

import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm border-b px-4 py-4">
      <div className="flex items-start gap-3">

        <button
          onClick={onMenuClick}
          className="lg:hidden mt-1 shrink-0"
        >
          <Menu size={28} />
        </button>

        <div className="min-w-0">
          <h2 className="text-lg md:text-2xl font-bold text-slate-800 leading-tight wrap-break-words">
            Sistem Monitoring Pembayaran Semester
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Kelola data pembayaran mahasiswa dengan mudah
          </p>
        </div>
      </div>
    </header>
  );
}