export type StatusNotifikasi =
    | "Belum Dibaca"
    | "Sudah Dibaca"
    | "Terkirim"
    | string;

export interface NotifikasiRow {
    id_notifikasi: number;
    id_pelapor: number;
    tipe_notifikasi?: string | null;
    pesan: string;
    status_notifikasi: StatusNotifikasi;
    created_at?: string | null;
    read_at?: string | null;
}

export interface Notifikasi {
    idNotifikasi: number;
    idPelapor: number;
    tipeNotifikasi: string | null;
    pesan: string;
    statusNotifikasi: StatusNotifikasi;
    createdAt: string | null;
    readAt: string | null;
}