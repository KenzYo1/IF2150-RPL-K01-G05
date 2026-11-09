import { createClient } from "@/lib/supabase/server";
import type {
    LaporanEntity,
    LaporanRow,
    NewLaporanData,
} from "@/types/laporan";

export type SupabaseQueryError = { message: string; code?: string } | null;

export interface LaporanSupabaseClient {
    from: (table: string) => {
        select: (columns?: string) => {
            eq: (
                column: string,
                value: number
            ) => {
                maybeSingle: () => PromiseLike<{
                    data: LaporanRow | null;
                    error: SupabaseQueryError;
                }>;
            };
            order: (
                column: string,
                options?: { ascending?: boolean }
            ) => PromiseLike<{
                data: LaporanRow[] | null;
                error: SupabaseQueryError;
            }>;
        };
        insert: (values: Record<string, unknown>) => {
            select: (columns?: string) => {
                single: () => PromiseLike<{
                    data: LaporanRow | null;
                    error: SupabaseQueryError;
                }>;
            };
        };
        update: (values: Record<string, unknown>) => {
            eq: (
                column: string,
                value: number
            ) => {
                select: (columns?: string) => {
                    maybeSingle: () => PromiseLike<{
                        data: LaporanRow | null;
                        error: SupabaseQueryError;
                    }>;
                };
            };
        };
    };
    auth?: {
        getUser: () => PromiseLike<{
            data: {
                user: {
                    id: string;
                    user_metadata?: Record<string, unknown>;
                    app_metadata?: Record<string, unknown>;
                } | null;
            };
            error: SupabaseQueryError;
        }>;
    };
}

export class LaporanRepositoryError extends Error {
    public readonly code: string;

    constructor(message: string, code = "DATABASE_ERROR") {
        super(message);
        this.name = "LaporanRepositoryError";
        this.code = code;
    }
}

export function mapRowToLaporanEntity(row: LaporanRow): LaporanEntity {
    return {
        idLaporan: Number(row.id_laporan),
        idPelapor:
            row.id_pelapor !== undefined && row.id_pelapor !== null
                ? Number(row.id_pelapor)
                : null,
        judulLaporan: row.judul_laporan ?? row.judul ?? null,
        kategori: row.kategori ?? null,
        descLaporan: row.deskripsi ?? "",
        lokasi: row.lokasi ?? null,
        fotoLaporan: row.foto_url ?? row.foto ?? null,
        likeLaporan:
            typeof row.jumlah_like === "number" && !Number.isNaN(row.jumlah_like)
                ? row.jumlah_like
                : 0,
        statusLaporan:
            row.status_laporan ??
            row.status ??
            row.status_penanganan ??
            "diproses",
        statusModerasi: row.status_moderasi ?? null,
        statusPenanganan: row.status_penanganan ?? null,
        pointsAwarded: Boolean(row.points_awarded),
        catatan: row.catatan ?? null,
        createdAt: row.created_at ?? null,
        updatedAt: row.updated_at ?? null,
    };
}

export async function getLaporanData(
    idLaporan: number,
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity | null> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LaporanSupabaseClient);

    const { data, error } = await supabase
        .from("laporan")
        .select("*")
        .eq("id_laporan", idLaporan)
        .maybeSingle();

    if (error) {
        throw new LaporanRepositoryError(
            "Gagal mengambil data laporan berdasarkan ID dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToLaporanEntity(data);
}

export async function getAllLaporan(
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity[]> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LaporanSupabaseClient);

    const { data, error } = await supabase
        .from("laporan")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new LaporanRepositoryError(
            "Gagal mengambil daftar laporan dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data.map(mapRowToLaporanEntity);
}

export async function insertNewLaporan(
    laporan: NewLaporanData | Partial<LaporanEntity>,
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LaporanSupabaseClient);

    const insertPayload: Record<string, unknown> = {
        judul: laporan.judulLaporan ?? null,
        deskripsi: laporan.descLaporan ?? "",
        foto_url: laporan.fotoLaporan ?? null,
        jumlah_like: 0,
        status_laporan: laporan.statusLaporan ?? "diproses",
    };

    if (laporan.idPelapor !== undefined && laporan.idPelapor !== null) {
        insertPayload.id_pelapor = laporan.idPelapor;
    }
    if (laporan.lokasi !== undefined && laporan.lokasi !== null) {
        insertPayload.lokasi = laporan.lokasi;
    }
    if (laporan.kategori !== undefined && laporan.kategori !== null) {
        insertPayload.kategori = laporan.kategori;
    }

    const { data, error } = await supabase
        .from("laporan")
        .insert(insertPayload)
        .select("*")
        .single();

    if (error || !data) {
        throw new LaporanRepositoryError(
            "Gagal menyimpan laporan baru ke database",
            error?.code ?? "DATABASE_INSERT_ERROR"
        );
    }

    return mapRowToLaporanEntity(data);
}

export async function setLaporanData(
    idLaporan: number,
    dataLaporan: Partial<LaporanEntity>,
    clientOverride?: LaporanSupabaseClient
): Promise<boolean> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LaporanSupabaseClient);

    const updatePayload: Record<string, unknown> = {};

    if (dataLaporan.judulLaporan !== undefined) {
        updatePayload.judul = dataLaporan.judulLaporan;
    }
    if (dataLaporan.descLaporan !== undefined) {
        updatePayload.deskripsi = dataLaporan.descLaporan;
    }
    if (dataLaporan.fotoLaporan !== undefined) {
        updatePayload.foto_url = dataLaporan.fotoLaporan;
    }
    if (dataLaporan.statusLaporan !== undefined) {
        updatePayload.status_laporan = dataLaporan.statusLaporan;
    }
    if (dataLaporan.statusModerasi !== undefined) {
        updatePayload.status_moderasi = dataLaporan.statusModerasi;
    }
    if (dataLaporan.statusPenanganan !== undefined) {
        updatePayload.status_penanganan = dataLaporan.statusPenanganan;
    }
    if (dataLaporan.catatan !== undefined) {
        updatePayload.catatan = dataLaporan.catatan;
    }
    if (dataLaporan.lokasi !== undefined) {
        updatePayload.lokasi = dataLaporan.lokasi;
    }
    if (dataLaporan.kategori !== undefined) {
        updatePayload.kategori = dataLaporan.kategori;
    }
    if (dataLaporan.likeLaporan !== undefined) {
        updatePayload.jumlah_like = dataLaporan.likeLaporan;
    }
    if (dataLaporan.pointsAwarded !== undefined) {
        updatePayload.points_awarded = dataLaporan.pointsAwarded;
    }

    const { data, error } = await supabase
        .from("laporan")
        .update(updatePayload)
        .eq("id_laporan", idLaporan)
        .select("*")
        .maybeSingle();

    if (error) {
        throw new LaporanRepositoryError(
            "Gagal memperbarui data laporan di database",
            error.code ?? "DATABASE_UPDATE_ERROR"
        );
    }

    return data !== null;
}