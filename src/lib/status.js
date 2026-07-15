export function getStatus(totalBayar, biayaSemester) {
  if (totalBayar >= biayaSemester) {
    return "Lunas";
  }

  if (totalBayar > 0) {
    return "Belum Lunas";
  }

  return "Belum Bayar";
}