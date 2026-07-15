import { getStatus } from "@/lib/status";

export default function StatusBadge({
  totalBayar,
  biayaSemester,
}) {
  const status = getStatus(totalBayar, biayaSemester);

  const colors = {
    "Lunas": "bg-green-500 text-white",
    "Belum Lunas": "bg-yellow-400 text-black",
    "Belum Bayar": "bg-red-500 text-white",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}