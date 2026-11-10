import { createClient } from "@/lib/supabase/server";
import type {
    Notifikasi,
    NotifikasiRow,
    StatusNotifikasi,
} from "@/types/notifikasi";

export type NotifikasiSupabaseError = { message: string; code?: string } | null;

export interface NotifikasiSupabaseClient {
    from: (table: string) => {
        select: (columns?: string) => {
            eq: (
                column: string,
                value: number
            ) => {
                maybeSingle: () => PromiseLike<{
                    data: NotifikasiRow | null;
                    error: NotifikasiSupabaseError;
                }>;
                order: (
                    orderColumn: string,
                    options?: { ascending?: boolean }
                ) => PromiseLike<{
                    data: NotifikasiRow[] | null;
                    error: NotifikasiSupabaseError;
                }>;
            };
        };
        insert: (values: Record<string, unknown>) => {
            select: (columns?: string) => {
                single: () => PromiseLike<{
                    data: NotifikasiRow | null;
                    error: NotifikasiSupabaseError;
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
                        data: NotifikasiRow | null;
                        error: NotifikasiSupabaseError;
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
            error: NotifikasiSupabaseError;
        }>;
    };
}

export class NotifikasiRepositoryError extends Error {
    public readonly code: string;

    constructor(message: string, code = "DATABASE_ERROR") {
        super(message);
        this.name = "NotifikasiRepositoryError";
        this.code = code;
    }
}

export function mapRowToNotifikasi(row: NotifikasiRow): Notifikasi {
    return {
        idNotifikasi: Number(row.id_notifikasi),
        idPelapor: Number(row.id_pelapor),
        tipeNotifikasi: row.tipe_notifikasi ?? null,
        pesan: row.pesan ?? "",
        statusNotifikasi: row.status_notifikasi ?? "Belum Dibaca",
        createdAt: row.created_at ?? null,
        readAt: row.read_at ?? null,
    };
}

export async function insertNotifikasiRecord(
    idPelapor: number,
    pesan: string,
    tipeNotifikasi?: string | null,
    clientOverride?: NotifikasiSupabaseClient
): Promise<Notifikasi> {
    const supabase =
        clientOverride ??
        ((await createClient()) as unknown as NotifikasiSupabaseClient);

    const insertPayload: Record<string, unknown> = {
        id_pelapor: idPelapor,
        pesan,
        status_notifikasi: "Belum Dibaca",
    };

    if (tipeNotifikasi !== undefined && tipeNotifikasi !== null) {
        insertPayload.tipe_notifikasi = tipeNotifikasi;
    }

    const { data, error } = await supabase
        .from("notifikasi")
        .insert(insertPayload)
        .select("*")
        .single();

    if (error || !data) {
        throw new NotifikasiRepositoryError(
            "Gagal menyimpan notifikasi baru ke database",
            error?.code ?? "DATABASE_INSERT_ERROR"
        );
    }

    return mapRowToNotifikasi(data);
}

export async function getNotifikasiByIdRecord(
    idNotifikasi: number,
    clientOverride?: NotifikasiSupabaseClient
): Promise<Notifikasi | null> {
    const supabase =
        clientOverride ??
        ((await createClient()) as unknown as NotifikasiSupabaseClient);

    const { data, error } = await supabase
        .from("notifikasi")
        .select("*")
        .eq("id_notifikasi", idNotifikasi)
        .maybeSingle();

    if (error) {
        throw new NotifikasiRepositoryError(
            "Gagal mengambil data notifikasi berdasarkan ID dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToNotifikasi(data);
}

export async function getNotifikasiByPelaporRecord(
    idPelapor: number,
    clientOverride?: NotifikasiSupabaseClient
): Promise<Notifikasi[]> {
    const supabase =
        clientOverride ??
        ((await createClient()) as unknown as NotifikasiSupabaseClient);

    const { data, error } = await supabase
        .from("notifikasi")
        .select("*")
        .eq("id_pelapor", idPelapor)
        .order("created_at", { ascending: false });

    if (error) {
        throw new NotifikasiRepositoryError(
            "Gagal mengambil daftar notifikasi pelapor dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data.map(mapRowToNotifikasi);
}

export async function updateStatusNotifikasiRecord(
    idNotifikasi: number,
    statusNotifikasi: StatusNotifikasi,
    readAt?: string | null,
    clientOverride?: NotifikasiSupabaseClient
): Promise<Notifikasi | null> {
    const supabase =
        clientOverride ??
        ((await createClient()) as unknown as NotifikasiSupabaseClient);

    const updatePayload: Record<string, unknown> = {
        status_notifikasi: statusNotifikasi,
    };

    if (readAt !== undefined) {
        updatePayload.read_at = readAt;
    }

    const { data, error } = await supabase
        .from("notifikasi")
        .update(updatePayload)
        .eq("id_notifikasi", idNotifikasi)
        .select("*")
        .maybeSingle();

    if (error) {
        throw new NotifikasiRepositoryError(
            "Gagal memperbarui status notifikasi di database",
            error.code ?? "DATABASE_UPDATE_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToNotifikasi(data);
}