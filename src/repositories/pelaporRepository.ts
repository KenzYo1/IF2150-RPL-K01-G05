import { createClient } from "@/lib/supabase/server";
import type {
    NewPelaporInput,
    PelaporEntity,
    PelaporRow,
    UpdatePelaporInput,
} from "@/types/pelapor";

export type PelaporSupabaseError = { message: string; code?: string } | null;

export interface PelaporSupabaseClient {
    from: (table: string) => {
        select: (columns?: string) => {
            eq: (
                column: string,
                value: number | string
            ) => {
                maybeSingle: () => PromiseLike<{
                    data: PelaporRow | null;
                    error: PelaporSupabaseError;
                }>;
            };
            order: (
                column: string,
                options?: { ascending?: boolean }
            ) => PromiseLike<{
                data: PelaporRow[] | null;
                error: PelaporSupabaseError;
            }>;
        };
        insert: (values: Record<string, unknown>) => {
            select: (columns?: string) => {
                single: () => PromiseLike<{
                    data: PelaporRow | null;
                    error: PelaporSupabaseError;
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
                        data: PelaporRow | null;
                        error: PelaporSupabaseError;
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
                    email?: string | null;
                    user_metadata?: Record<string, unknown>;
                    app_metadata?: Record<string, unknown>;
                } | null;
            };
            error: PelaporSupabaseError;
        }>;
    };
}

export class PelaporRepositoryError extends Error {
    public readonly code: string;

    constructor(message: string, code = "DATABASE_ERROR") {
        super(message);
        this.name = "PelaporRepositoryError";
        this.code = code;
    }
}

export function mapRowToPelaporEntity(row: PelaporRow): PelaporEntity {
    return {
        idPelapor: Number(row.id_pelapor),
        authUserId: row.auth_user_id ?? null,
        namaPelapor: row.nama_pelapor ?? "",
        nimnipPelapor: row.nim_nip ?? "",
        poinPelapor:
            typeof row.poin === "number" && !Number.isNaN(row.poin) ? row.poin : 0,
        createdAt: row.created_at ?? null,
        updatedAt: row.updated_at ?? null,
    };
}

export async function getDataPelapor(
    idPelapor: number,
    clientOverride?: PelaporSupabaseClient
): Promise<PelaporEntity | null> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as PelaporSupabaseClient);

    const { data, error } = await supabase
        .from("pelapor")
        .select("*")
        .eq("id_pelapor", idPelapor)
        .maybeSingle();

    if (error) {
        throw new PelaporRepositoryError(
            "Gagal mengambil data pelapor berdasarkan ID dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToPelaporEntity(data);
}

export async function getDataPelaporByAuthUserId(
    authUserId: string,
    clientOverride?: PelaporSupabaseClient
): Promise<PelaporEntity | null> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as PelaporSupabaseClient);

    const { data, error } = await supabase
        .from("pelapor")
        .select("*")
        .eq("auth_user_id", authUserId)
        .maybeSingle();

    if (error) {
        throw new PelaporRepositoryError(
            "Gagal mengambil data pelapor berdasarkan auth_user_id dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToPelaporEntity(data);
}

export async function getAllPelapor(
    clientOverride?: PelaporSupabaseClient
): Promise<PelaporEntity[]> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as PelaporSupabaseClient);

    const { data, error } = await supabase
        .from("pelapor")
        .select("*")
        .order("id_pelapor", { ascending: true });

    if (error) {
        throw new PelaporRepositoryError(
            "Gagal mengambil daftar seluruh pelapor dari database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data.map(mapRowToPelaporEntity);
}

export async function updateDataPelapor(
    idPelapor: number,
    poinAtauDataPelapor: number | UpdatePelaporInput,
    clientOverride?: PelaporSupabaseClient
): Promise<boolean> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as PelaporSupabaseClient);

    const updatePayload: Record<string, unknown> = {};

    if (typeof poinAtauDataPelapor === "number") {
        updatePayload.poin = poinAtauDataPelapor;
    } else {
        if (poinAtauDataPelapor.namaPelapor !== undefined) {
            updatePayload.nama_pelapor = poinAtauDataPelapor.namaPelapor;
        }
        if (poinAtauDataPelapor.nimnipPelapor !== undefined) {
            updatePayload.nim_nip = poinAtauDataPelapor.nimnipPelapor;
        }
        if (poinAtauDataPelapor.poinPelapor !== undefined) {
            updatePayload.poin = poinAtauDataPelapor.poinPelapor;
        }
    }

    const { data, error } = await supabase
        .from("pelapor")
        .update(updatePayload)
        .eq("id_pelapor", idPelapor)
        .select("*")
        .maybeSingle();

    if (error) {
        throw new PelaporRepositoryError(
            "Gagal memperbarui data pelapor di database",
            error.code ?? "DATABASE_UPDATE_ERROR"
        );
    }

    return data !== null;
}

export async function insertPelapor(
    pelapor: NewPelaporInput,
    clientOverride?: PelaporSupabaseClient
): Promise<PelaporEntity> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as PelaporSupabaseClient);

    const insertPayload: Record<string, unknown> = {
        nama_pelapor: pelapor.namaPelapor,
        nim_nip: pelapor.nimnipPelapor,
        poin: pelapor.poinPelapor ?? 0,
    };

    if (pelapor.authUserId !== undefined && pelapor.authUserId !== null) {
        insertPayload.auth_user_id = pelapor.authUserId;
    }

    const { data, error } = await supabase
        .from("pelapor")
        .insert(insertPayload)
        .select("*")
        .single();

    if (error || !data) {
        throw new PelaporRepositoryError(
            "Gagal menyimpan pelapor baru ke database",
            error?.code ?? "DATABASE_INSERT_ERROR"
        );
    }

    return mapRowToPelaporEntity(data);
}