import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa");

    const lunas = rows.filter(
      (m) => Number(m.total_bayar) >= Number(m.biaya_semester)
    ).length;

    const belumLunas = rows.filter(
      (m) =>
        Number(m.total_bayar) > 0 &&
        Number(m.total_bayar) < Number(m.biaya_semester)
    ).length;

    const belumBayar = rows.filter(
      (m) => Number(m.total_bayar) === 0
    ).length;

    return NextResponse.json([
      {
        name: "Lunas",
        jumlah: lunas,
      },
      {
        name: "Belum Lunas",
        jumlah: belumLunas,
      },
      {
        name: "Belum Bayar",
        jumlah: belumBayar,
      },
    ]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data grafik" },
      { status: 500 }
    );
  }
}