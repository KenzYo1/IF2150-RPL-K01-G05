import { createClient } from "@/lib/supabase/server";
import type { LaporanEntity, LaporanRow } from "@/types/laporan";

export interface LaporanSupabaseClient {
    from: (table: string) => {
        select: (columns?: string) => {
            eq: (
                column: string,
                value: number
            ) => {
                maybeSingle: () => PromiseLike<{
                    data: LaporanRow | null;
                    error: { message: string; code?: string } | null;
                }>;
            };
            order: (
                column: string,
                options?: { ascending?: boolean }
            ) => PromiseLike<{
                data: LaporanRow[] | null;
                error: { message: string; code?: string } | null;
            }>;
        };
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