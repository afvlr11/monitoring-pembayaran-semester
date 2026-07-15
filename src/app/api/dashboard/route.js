import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa");

    const totalMahasiswa = rows.length;

    const lunas = rows.filter((m) => {
      const bayar = Number(m.total_bayar);
      const biaya = Number(m.biaya_semester);
      return bayar >= biaya;
    }).length;

    const belumLunas = rows.filter((m) => {
      const bayar = Number(m.total_bayar);
      const biaya = Number(m.biaya_semester);
      return bayar > 0 && bayar < biaya;
    }).length;

    const belumBayar = rows.filter((m) => {
      return Number(m.total_bayar) === 0;
    }).length;

    const totalMasuk = rows.reduce(
      (total, m) => total + Number(m.total_bayar),
      0
    );

    const totalTagihan = rows.reduce(
      (total, m) => total + Number(m.biaya_semester),
      0
    );

    const totalPiutang = totalTagihan - totalMasuk;

    return NextResponse.json({
      totalMahasiswa,
      lunas,
      belumLunas,
      belumBayar,
      totalMasuk,
      totalPiutang,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data dashboard" },
      { status: 500 }
    );
  }
}