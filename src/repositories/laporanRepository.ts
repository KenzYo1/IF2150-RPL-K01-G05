import { createClient } from "@/lib/supabase/server";
import {
    buildLaporanFotoStoragePath,
    extractStoragePathFromUrlOrPath,
    getLaporanStorageBucket,
    normalizeFotoContentType,
} from "@/lib/supabase/storage";
import type {
    FotoStorageUploadResult,
    FotoUploadFileInput,
    LaporanEntity,
    LaporanRow,
    NewLaporanData,
} from "@/types/laporan";

export type SupabaseQueryError = {
    message: string;
    code?: string;
    details?: string | null;
    hint?: string | null;
    status?: number;
    statusCode?: string | number;
} | null;

export interface SupabaseStorageBucketClient {
    upload: (
        path: string,
        fileBody: ArrayBuffer | Uint8Array | Blob,
        options?: {
            contentType?: string;
            upsert?: boolean;
            cacheControl?: string;
        }
    ) => PromiseLike<{
        data: { path: string; id?: string; fullPath?: string } | null;
        error: SupabaseQueryError;
    }>;
    getPublicUrl: (path: string) => {
        data: { publicUrl: string };
    };
    remove: (paths: string[]) => PromiseLike<{
        data: unknown;
        error: SupabaseQueryError;
    }>;
}

export interface LaporanSupabaseClient {
    from: (table: string) => {
        select: (columns?: string) => {
            eq: (
                column: string,
                value: number
            ) => {
                maybeSingle: () => PromiseLike<{
                    data: LaporanRow | Record<string, unknown> | null;
                    error: SupabaseQueryError;
                }>;
            };
            order: (
                column: string,
                options?: { ascending?: boolean }
            ) => PromiseLike<{
                data: (LaporanRow | Record<string, unknown>)[] | null;
                error: SupabaseQueryError;
            }>;
        };
        insert: (values: Record<string, unknown>) => {
            select: (columns?: string) => {
                single: () => PromiseLike<{
                    data: LaporanRow | Record<string, unknown> | null;
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
                        data: LaporanRow | Record<string, unknown> | null;
                        error: SupabaseQueryError;
                    }>;
                };
            };
        };
    };
    storage?: {
        from: (bucket: string) => SupabaseStorageBucketClient;
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
    public readonly statusCode: number;

    constructor(message: string, code = "DATABASE_ERROR", statusCode = 500) {
        super(message);
        this.name = "LaporanRepositoryError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

function resolveHttpStatusFromError(error: SupabaseQueryError): number {
    if (!error) {
        return 500;
    }
    if (
        typeof error.status === "number" &&
        error.status >= 400 &&
        error.status < 600
    ) {
        return error.status;
    }
    if (
        typeof error.statusCode === "number" &&
        error.statusCode >= 400 &&
        error.statusCode < 600
    ) {
        return error.statusCode;
    }
    if (
        typeof error.statusCode === "string" &&
        /^\d+$/.test(error.statusCode)
    ) {
        const parsed = Number.parseInt(error.statusCode, 10);
        if (parsed >= 400 && parsed < 600) {
            return parsed;
        }
    }
    if (error.code === "AccessDenied" || error.code === "42501") {
        return 403;
    }
    return 500;
}

function createLaporanRepositoryError(
    baseMessage: string,
    error: SupabaseQueryError,
    fallbackCode: string
): LaporanRepositoryError {
    const parts = [error?.message, error?.details, error?.hint]
        .filter((part): part is string => typeof part === "string" && part.trim().length > 0);
    const detail = parts.length > 0 ? `: ${parts.join(" | ")}` : "";

    return new LaporanRepositoryError(
        `${baseMessage}${detail}`,
        error?.code ?? fallbackCode,
        resolveHttpStatusFromError(error)
    );
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
        throw createLaporanRepositoryError(
            "Gagal mengambil data laporan berdasarkan ID dari database",
            error,
            "DATABASE_QUERY_ERROR"
        );
    }

    if (!data) {
        return null;
    }

    return mapRowToLaporanEntity(data as unknown as LaporanRow);
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
        throw createLaporanRepositoryError(
            "Gagal mengambil daftar laporan dari database",
            error,
            "DATABASE_QUERY_ERROR"
        );
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data.map((row) => mapRowToLaporanEntity(row as unknown as LaporanRow));
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
        throw createLaporanRepositoryError(
            "Gagal menyimpan laporan baru ke database",
            error,
            "DATABASE_INSERT_ERROR"
        );
    }

    return mapRowToLaporanEntity(data as unknown as LaporanRow);
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
        throw createLaporanRepositoryError(
            "Gagal memperbarui data laporan di database",
            error,
            "DATABASE_UPDATE_ERROR"
        );
    }

    return data !== null;
}

export async function uploadFotoLaporanToStorage(
    file: FotoUploadFileInput,
    options?: {
        idPelapor?: number | null;
        bucket?: string;
        customPath?: string;
    },
    clientOverride?: LaporanSupabaseClient
): Promise<FotoStorageUploadResult> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LaporanSupabaseClient);

    if (!supabase.storage) {
        throw new LaporanRepositoryError(
            "Layanan Supabase Storage tidak tersedia pada client",
            "STORAGE_NOT_CONFIGURED"
        );
    }

    const bucket = getLaporanStorageBucket(options?.bucket);
    const storagePath =
        options?.customPath?.trim() ||
        buildLaporanFotoStoragePath(
            file.fileName,
            file.mimeType,
            options?.idPelapor
        );
    const contentType = normalizeFotoContentType(file.mimeType, file.fileName);

    const bucketClient = supabase.storage.from(bucket);
    const { data: uploadData, error: uploadError } = await bucketClient.upload(
        storagePath,
        file.buffer,
        {
            contentType,
            upsert: false,
            cacheControl: "3600",
        }
    );

    if (uploadError || !uploadData?.path) {
        throw createLaporanRepositoryError(
            "Gagal mengunggah foto laporan ke Supabase Storage",
            uploadError,
            "STORAGE_UPLOAD_ERROR"
        );
    }

    const { data: publicUrlData } = bucketClient.getPublicUrl(uploadData.path);
    const publicUrl = publicUrlData?.publicUrl?.trim() ?? "";

    if (!publicUrl) {
        throw new LaporanRepositoryError(
            "Gagal mendapatkan URL publik foto laporan dari Supabase Storage",
            "STORAGE_PUBLIC_URL_ERROR"
        );
    }

    return {
        bucket,
        path: uploadData.path,
        publicUrl,
    };
}

export async function deleteFotoLaporanFromStorage(
    pathOrPublicUrl: string,
    bucketOverride?: string,
    clientOverride?: LaporanSupabaseClient
): Promise<boolean> {
    const supabase =
        clientOverride ?? ((await createClient()) as unknown as LaporanSupabaseClient);

    if (!supabase.storage) {
        throw new LaporanRepositoryError(
            "Layanan Supabase Storage tidak tersedia pada client",
            "STORAGE_NOT_CONFIGURED"
        );
    }

    const bucket = getLaporanStorageBucket(bucketOverride);
    const relativePath = extractStoragePathFromUrlOrPath(
        pathOrPublicUrl,
        bucket
    );

    if (!relativePath) {
        return false;
    }

    const { error } = await supabase.storage
        .from(bucket)
        .remove([relativePath]);

    if (error) {
        throw createLaporanRepositoryError(
            "Gagal menghapus foto laporan dari Supabase Storage",
            error,
            "STORAGE_DELETE_ERROR"
        );
    }

    return true;
}
