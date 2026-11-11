import type { LaporanEntity, StatusLaporan } from "@/types/laporan";
import type { Notifikasi } from "@/types/notifikasi";

export interface TanggapanInput {
    statusLaporan?: StatusLaporan;
    tanggapan?: StatusLaporan;
    status?: StatusLaporan;
    statusModerasi?: string | null;
    statusPenanganan?: string | null;
    statusTuntasLaporan?: string | null;
    catatan?: string | null;
    komentar?: string | null;
    poin?: number;
}

export interface TanggapanRequest extends TanggapanInput {
    idLaporan?: number | string;
    id_laporan?: number | string;
}

export interface AddPoinPelaporResult {
    idPelapor: number;
    poinLama: number;
    poinDitambahkan: number;
    poinBaru: number;
}

export interface TanggapanActionResult {
    laporan: LaporanEntity;
    pointsAwardedNow: boolean;
    poinDitambahkan: number;
    poinPelaporBaru: number | null;
    notifikasiSent: boolean;
    notifikasi: Notifikasi | null;
}

