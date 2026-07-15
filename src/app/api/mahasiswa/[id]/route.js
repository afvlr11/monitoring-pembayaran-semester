import { NextResponse } from "next/server";
import db from "@/lib/db";

// Ambil satu data mahasiswa
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.query(
      "SELECT * FROM mahasiswa WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Update pembayaran
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { total_bayar } = await request.json();

    // Ambil data biaya semester
    const [rows] = await db.query(
      "SELECT biaya_semester FROM mahasiswa WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Mahasiswa tidak ditemukan" },
        { status: 404 }
      );
    }

    const biayaSemester = Number(rows[0].biaya_semester);
    const totalBayar = Number(total_bayar);

    let status;

    if (totalBayar === 0) {
      status = "Belum Bayar";
    } else if (totalBayar < biayaSemester) {
      status = "Belum Lunas";
    } else {
      status = "Lunas";
    }

    await db.query(
      `
      UPDATE mahasiswa
      SET
        total_bayar = ?,
        status = ?
      WHERE id = ?
      `,
      [totalBayar, status, id]
    );

    return NextResponse.json({
      message: "Pembayaran berhasil diperbarui",
      status,
      total_bayar: totalBayar,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal memperbarui pembayaran",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Hapus mahasiswa
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query(
      "DELETE FROM mahasiswa WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Data berhasil dihapus",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal menghapus data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}