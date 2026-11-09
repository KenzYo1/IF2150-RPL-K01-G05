import { createClient } from "@/lib/supabase/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import type { LikeEntity, LikeRow } from "@/types/like";

export type LikeSupabaseError = { message: string; code?: string } | null;

export interface LikeSupabaseClient extends LaporanSupabaseClient {
    from: (table: string) => {
        select: (columns?: string) => {
            eq: (
                column: string,
                value: number
            ) => {
                maybeSingle: () => PromiseLike<{
                    data: Record<string, unknown> | null;
                    error: LikeSupabaseError;
                }>;
                eq: (
                    secondColumn: string,
                    secondValue: number
                ) => {
                    maybeSingle: () => PromiseLike<{
                        data: LikeRow | null;
                        error: LikeSupabaseError;
                    }>;
                };
            };
            order: (
                column: string,
                options?: { ascending?: boolean }
            ) => PromiseLike<{
                data: Record<string, unknown>[] | null;
                error: LikeSupabaseError;
            }>;
        };
        insert: (values: Record<string, unknown>) => {
            select: (columns?: string) => {
                single: () => PromiseLike<{
                    data: Record<string, unknown> | null;
                    error: LikeSupabaseError;
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
                        data: Record<string, unknown> | null;
                        error: LikeSupabaseError;
                    }>;
                };
            };
        };
        delete: () => {
            eq: (
                column: string,
                value: number
            ) => {
                eq: (
                    secondColumn: string,
                    secondValue: number
                ) => {
                    select: (columns?: string) => PromiseLike<{
                        data: LikeRow[] | null;
                        error: LikeSupabaseError;
                    }>;
                };
            };
        };
    };
}

export class LikeRepositoryError extends Error {
    public readonly code: string;

    constructor(message: string, code = "DATABASE_ERROR") {
        super(message);
        this.name = "LikeRepositoryError";
        this.code = code;
    }
}

export function mapRowToLikeEntity(row: LikeRow): LikeEntity {
    return {
        idLike:
            row.id_like !== undefined && row.id_like !== null
                ? Number(row.id_like)
                : null,
        idPelapor: Number(row.id_pelapor),
        idLaporan: Number(row.id_laporan),
        createdAt: row.created_at ?? null,
    };
}

export async function findLikeRecord(
    idLaporan: number,
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<LikeEntity | null> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LikeSupabaseClient);

    const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("id_laporan", idLaporan)
        .eq("id_pelapor", idPelapor)
        .maybeSingle();

    if (error) {
        throw new LikeRepositoryError(
            "Gagal memeriksa status like pada database",
            error.code ?? "DATABASE_QUERY_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToLikeEntity(data);
}

export async function insertLikeRecord(
    idLaporan: number,
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<LikeEntity> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LikeSupabaseClient);

    const { data, error } = await supabase
        .from("likes")
        .insert({
            id_laporan: idLaporan,
            id_pelapor: idPelapor,
        })
        .select("*")
        .single();

    if (error || !data) {
        throw new LikeRepositoryError(
            "Gagal menyimpan data like ke database",
            error?.code ?? "DATABASE_INSERT_ERROR"
        );
    }

    return mapRowToLikeEntity(data as unknown as LikeRow);
}

export async function deleteLikeRecord(
    idLaporan: number,
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<boolean> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LikeSupabaseClient);

    const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("id_laporan", idLaporan)
        .eq("id_pelapor", idPelapor)
        .select("*");

    if (error) {
        throw new LikeRepositoryError(
            "Gagal menghapus data like dari database",
            error.code ?? "DATABASE_DELETE_ERROR"
        );
    }

    return Array.isArray(data) && data.length > 0;
}