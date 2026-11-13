"use server";

import { getLaporanByIdService } from "@/services/laporanService";
import { getPelaporPoin } from "@/services/leaderboardService";
import { getPelaporByIdService } from "@/services/pelaporService";
import { addPoinPelapor, setStatusLaporan } from "@/services/tanggapanService";
import { StatusLaporan } from "@/types/laporan";

export async function getLaporanDetail(id: string) {
  try {
    const l = await getLaporanByIdService(id);
    return {
      ok: true as const,
      data: {
        idLaporan: l.idLaporan,
        judul: l.judulLaporan ?? "(Tanpa judul)",
        deskripsi: l.descLaporan,
        lokasi: l.lokasi ?? "",
      },
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal memuat laporan";
    return { ok: false as const, error: message };
  }
}

export async function submitTanggapan(
  idLaporan: number,
  data: { status: string; komentar: string}
) {
  let status: StatusLaporan;
  let moderasi: string;

  if (data.status === "Diterima") {
    status = "diproses";
    moderasi = "valid";
    const laporan = await getLaporanByIdService(idLaporan);
    const idPelapor = laporan.idPelapor; // number | null
    addPoinPelapor(Number(idPelapor));
  } else if (data.status === "Ditolak") {
    status = "ditolak";
    moderasi = "tidak valid"; // use your real rejected value
  }
  else {
    status = "diproses";
    moderasi = "menunggu";
  }

  const ok = await setStatusLaporan(idLaporan, status, {
    statusModerasi: moderasi,
    catatan: data.komentar, // saves the comment
  });

  if (!ok) return { ok: false as const, error: "Gagal menyimpan" };
  return { ok: true as const };
}