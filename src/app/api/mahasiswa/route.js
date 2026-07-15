import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET semua data
export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM mahasiswa ORDER BY id DESC"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data." },
      { status: 500 }
    );
  }
}

// POST tambah data
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      nim,
      nama,
      prodi,
      angkatan,
    } = body;

    // Validasi
    if (!nim || !nama || !prodi || !angkatan) {
      return NextResponse.json(
        { message: "Semua data wajib diisi." },
        { status: 400 }
      );
    }

    const biayaSemester = 1750000;
    const totalBayar = 0;
    const status = "Belum Bayar";

    await db.query(
      `
      INSERT INTO mahasiswa
      (nim, nama, prodi, angkatan, biaya_semester, status, total_bayar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nim,
        nama,
        prodi,
        angkatan,
        biayaSemester,
        status,
        totalBayar,
      ]
    );

    return NextResponse.json({
      message: "Data berhasil ditambahkan.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal menambah data.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}