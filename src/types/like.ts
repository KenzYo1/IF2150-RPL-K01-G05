export interface LikeRow {
    id_like?: number;
    id_pelapor: number;
    id_laporan: number;
    created_at?: string | null;
}

export interface LikeEntity {
    idLike: number | null;
    idPelapor: number;
    idLaporan: number;
    createdAt: string | null;
}

export interface LikeRequest {
    idLaporan?: number | string;
}

export interface LikeActionResult {
    idLaporan: number;
    idPelapor: number;
    liked: boolean;
    jumlahLike: number;
}