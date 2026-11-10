export type StatusLaporan = "diproses" | "tuntas" | "ditolak" | string;

export type AllowedFotoMimeType = "image/jpeg" | "image/jpg" | "image/png";

export interface LaporanRow {
    id_laporan: number;
    id_pelapor: number | null;
    judul?: string | null;
    judul_laporan?: string | null;
    kategori?: string | null;
    deskripsi: string;
    lokasi?: string | null;
    foto_url?: string | null;
    foto?: string | null;
    jumlah_like: number | null;
    status_laporan?: StatusLaporan | null;
    status?: StatusLaporan | null;
    status_moderasi?: string | null;
    status_penanganan?: string | null;
    points_awarded?: boolean | null;
    catatan?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

export interface LaporanEntity {
    idLaporan: number;
    idPelapor: number | null;
    judulLaporan: string | null;
    kategori: string | null;
    descLaporan: string;
    lokasi: string | null;
    fotoLaporan: string | null;
    likeLaporan: number;
    statusLaporan: StatusLaporan;
    statusModerasi: string | null;
    statusPenanganan: string | null;
    pointsAwarded: boolean;
    catatan: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface NewLaporanData {
    idPelapor?: number | null;
    judulLaporan?: string | null;
    kategori?: string | null;
    descLaporan: string;
    lokasi?: string | null;
    fotoLaporan?: string | null;
    statusLaporan?: StatusLaporan;
}

export interface FotoUploadFileInput {
    buffer: Uint8Array | ArrayBuffer | Blob;
    fileName: string;
    mimeType: string;
    size: number;
}

export interface FotoStorageUploadResult {
    bucket: string;
    path: string;
    publicUrl: string;
}

export interface CreateLaporanInput {
    idPelapor?: number | null;
    judulLaporan?: string | null;
    kategori?: string | null;
    descLaporan: string;
    lokasi?: string | null;
    fotoFile?: FotoUploadFileInput | File | null;
    fotoLaporan?: string | null;
    statusLaporan?: StatusLaporan;
}

export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    message: string;
}

export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
    };
}
