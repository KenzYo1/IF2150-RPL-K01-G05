import {
    ALLOWED_FOTO_EXTENSIONS,
    ALLOWED_FOTO_MIME_TYPES,
    fileToFotoUploadInput,
    MAX_FOTO_SIZE_BYTES,
    MAX_FOTO_SIZE_MB,
} from "@/lib/supabase/storage";
import {
    deleteFotoLaporanFromStorage,
    getAllLaporan,
    getLaporanData,
    insertNewLaporan,
    LaporanRepositoryError,
    type LaporanSupabaseClient,
    setLaporanData,
    uploadFotoLaporanToStorage,
} from "@/repositories/laporanRepository";
import {
    getDataPelaporByAuthUserId,
    type PelaporSupabaseClient,
} from "@/repositories/pelaporRepository";
import {
    PelaporServiceError,
    resolvePelaporAuthContext,
} from "@/services/pelaporService";
import type {
    CreateLaporanInput,
    FotoStorageUploadResult,
    FotoUploadFileInput,
    LaporanEntity,
    StatusLaporan,
} from "@/types/laporan";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export const MAX_DESKRIPSI_CHARS = 300;
export const MAX_JUDUL_CHARS = 100;

export class LaporanServiceError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode: number) {
        super(message);
        this.name = "LaporanServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

export function parseAndValidateIdLaporan(rawId: string | number): number {
    if (typeof rawId === "number") {
        if (!Number.isInteger(rawId) || rawId <= 0) {
            throw new LaporanServiceError(
                "INVALID_LAPORAN_ID",
                "ID laporan harus berupa bilangan bulat positif",
                400
            );
        }
        return rawId;
    }

    const trimmed = rawId.trim();
    if (!/^\d+$/.test(trimmed)) {
        throw new LaporanServiceError(
            "INVALID_LAPORAN_ID",
            "ID laporan harus berupa bilangan bulat positif",
            400
        );
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isNaN(parsed) || !Number.isSafeInteger(parsed) || parsed <= 0) {
        throw new LaporanServiceError(
            "INVALID_LAPORAN_ID",
            "ID laporan harus berupa bilangan bulat positif",
            400
        );
    }

    return parsed;
}

export function isJumlahKarakterValid(
    deskripsi: string,
    maxKarakter = MAX_DESKRIPSI_CHARS
): boolean {
    if (typeof deskripsi !== "string") {
        return false;
    }
    const trimmed = deskripsi.trim();
    return trimmed.length > 0 && trimmed.length <= maxKarakter;
}

export function isUkuranFotoValid(
    sizeInBytes: number,
    maxUkuranBytes = MAX_FOTO_SIZE_BYTES
): boolean {
    return (
        typeof sizeInBytes === "number" &&
        Number.isFinite(sizeInBytes) &&
        sizeInBytes > 0 &&
        sizeInBytes <= maxUkuranBytes
    );
}

export function isJenisFotoValid(mimeType: string, fileName = ""): boolean {
    const normalizedMime = (mimeType ?? "").trim().toLowerCase();
    const mimeValid = (ALLOWED_FOTO_MIME_TYPES as readonly string[]).includes(
        normalizedMime
    );

    const lowerFileName = (fileName ?? "").trim().toLowerCase();
    if (!lowerFileName) {
        return mimeValid;
    }

    const hasExtension = lowerFileName.includes(".");
    if (!hasExtension) {
        return mimeValid;
    }

    const extValid = ALLOWED_FOTO_EXTENSIONS.some((ext) =>
        lowerFileName.endsWith(ext)
    );

    if (normalizedMime) {
        return mimeValid && extValid;
    }

    return extValid;
}

export function isLaporanValid(
    desc: string,
    foto?: {
        size: number;
        mimeType?: string;
        type?: string;
        fileName?: string;
        name?: string;
    } | null,
    maxDescChar = MAX_DESKRIPSI_CHARS,
    maxFotoSize = MAX_FOTO_SIZE_BYTES
): boolean {
    if (!isJumlahKarakterValid(desc, maxDescChar)) {
        return false;
    }

    if (!foto) {
        return false;
    }

    const mime = foto.mimeType ?? foto.type ?? "";
    const name = foto.fileName ?? foto.name ?? "";

    return (
        isUkuranFotoValid(foto.size, maxFotoSize) &&
        isJenisFotoValid(mime, name)
    );
}

export function validateFotoLaporanInput(file: FotoUploadFileInput): void {
    if (!file || typeof file.size !== "number" || file.size <= 0) {
        throw new LaporanServiceError(
            "EMPTY_FOTO_FILE",
            "File foto bukti laporan wajib disertakan dan tidak boleh kosong",
            400
        );
    }

    if (!isJenisFotoValid(file.mimeType, file.fileName)) {
        throw new LaporanServiceError(
            "INVALID_FOTO_TYPE",
            "Format file foto tidak didukung. Hanya file JPEG atau PNG yang diperbolehkan",
            400
        );
    }

    if (!isUkuranFotoValid(file.size, MAX_FOTO_SIZE_BYTES)) {
        throw new LaporanServiceError(
            "FOTO_TOO_LARGE",
            `Ukuran file foto melebihi batas maksimal ${MAX_FOTO_SIZE_MB} MB`,
            400
        );
    }
}

export async function uploadFotoLaporanService(
    rawFile: File | FotoUploadFileInput,
    options?: {
        idPelapor?: number | null;
        bucket?: string;
        customPath?: string;
    },
    clientOverride?: LaporanSupabaseClient
): Promise<FotoStorageUploadResult> {
    if (!rawFile) {
        throw new LaporanServiceError(
            "MISSING_FOTO_FILE",
            "File foto bukti laporan wajib diunggah",
            400
        );
    }

    const fileInput = await fileToFotoUploadInput(rawFile);
    validateFotoLaporanInput(fileInput);

    try {
        return await uploadFotoLaporanToStorage(
            fileInput,
            options,
            clientOverride
        );
    } catch (error) {
        if (error instanceof LaporanRepositoryError) {
            throw new LaporanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }
}

export async function createLaporanService(
    input: CreateLaporanInput,
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<LaporanEntity> {
    const deskripsi =
        typeof input.descLaporan === "string" ? input.descLaporan.trim() : "";

    if (!deskripsi) {
        throw new LaporanServiceError(
            "INVALID_LAPORAN_DESKRIPSI",
            "Deskripsi laporan wajib diisi",
            400
        );
    }

    if (!isJumlahKarakterValid(deskripsi, MAX_DESKRIPSI_CHARS)) {
        throw new LaporanServiceError(
            "DESKRIPSI_TOO_LONG",
            `Deskripsi laporan maksimal ${MAX_DESKRIPSI_CHARS} karakter`,
            400
        );
    }

    const judul =
        typeof input.judulLaporan === "string"
            ? input.judulLaporan.trim()
            : null;
    if (judul && judul.length > MAX_JUDUL_CHARS) {
        throw new LaporanServiceError(
            "JUDUL_TOO_LONG",
            `Judul laporan maksimal ${MAX_JUDUL_CHARS} karakter`,
            400
        );
    }

    let resolvedIdPelapor: number | null = input.idPelapor ?? null;
    if (resolvedIdPelapor === null) {
        try {
            const authUser = await resolvePelaporAuthContext(
                clientOverride as unknown as PelaporSupabaseClient | undefined,
                authOverride
            );
            resolvedIdPelapor = authUser.idPelapor ?? null;
            if (resolvedIdPelapor === null && authUser.authUserId) {
                const pelaporByAuth = await getDataPelaporByAuthUserId(
                    authUser.authUserId,
                    clientOverride as unknown as PelaporSupabaseClient | undefined
                ).catch(() => null);
                resolvedIdPelapor = pelaporByAuth?.idPelapor ?? null;
            }
        } catch (error) {
            if (error instanceof PelaporServiceError) {
                throw new LaporanServiceError(
                    error.code,
                    error.message,
                    error.statusCode
                );
            }
            throw error;
        }
    }

    let uploadedStorage: FotoStorageUploadResult | null = null;
    let finalFotoUrl: string | null =
        typeof input.fotoLaporan === "string" &&
        input.fotoLaporan.trim().length > 0
            ? input.fotoLaporan.trim()
            : null;

    if (input.fotoFile) {
        uploadedStorage = await uploadFotoLaporanService(
            input.fotoFile,
            { idPelapor: resolvedIdPelapor },
            clientOverride
        );
        finalFotoUrl = uploadedStorage.publicUrl;
    }

    if (!finalFotoUrl) {
        throw new LaporanServiceError(
            "MISSING_FOTO_LAPORAN",
            "Foto bukti laporan wajib disertakan",
            400
        );
    }

    try {
        return await insertNewLaporan(
            {
                idPelapor: resolvedIdPelapor,
                judulLaporan: judul,
                kategori:
                    typeof input.kategori === "string" &&
                    input.kategori.trim().length > 0
                        ? input.kategori.trim()
                        : null,
                descLaporan: deskripsi,
                lokasi:
                    typeof input.lokasi === "string" &&
                    input.lokasi.trim().length > 0
                        ? input.lokasi.trim()
                        : null,
                fotoLaporan: finalFotoUrl,
                statusLaporan: input.statusLaporan ?? "diproses",
            },
            clientOverride
        );
    } catch (insertError) {
        if (uploadedStorage) {
            await deleteFotoLaporanFromStorage(
                uploadedStorage.path,
                uploadedStorage.bucket,
                clientOverride
            ).catch(() => undefined);
        }

        if (insertError instanceof LaporanRepositoryError) {
            throw new LaporanServiceError(
                insertError.code,
                insertError.message,
                insertError.statusCode
            );
        }
        throw insertError;
    }
}

function rethrowAsLaporanServiceError(error: unknown): never {
    if (error instanceof LaporanRepositoryError) {
        throw new LaporanServiceError(
            error.code,
            error.message,
            error.statusCode
        );
    }
    throw error;
}

export async function listLaporanService(
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity[]> {
    try {
        return await getAllLaporan(clientOverride);
    } catch (error) {
        rethrowAsLaporanServiceError(error);
    }
}

export async function getValidLaporanService(
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity[]> {
    const daftarLaporan = await listLaporanService(clientOverride);
    return daftarLaporan.filter(
        (laporan) =>
            laporan.statusLaporan !== "ditolak" &&
            laporan.statusModerasi !== "ditolak"
    );
}

export async function setStatusLaporanService(
    rawIdLaporan: string | number,
    statusLaporan: StatusLaporan,
    clientOverride?: LaporanSupabaseClient
): Promise<boolean> {
    const idLaporan = parseAndValidateIdLaporan(rawIdLaporan);
    const trimmedStatus =
        typeof statusLaporan === "string" ? statusLaporan.trim() : "";

    if (!trimmedStatus) {
        throw new LaporanServiceError(
            "INVALID_STATUS_LAPORAN",
            "Status laporan tidak boleh kosong",
            400
        );
    }

    try {
        const existing = await getLaporanData(idLaporan, clientOverride);
        if (!existing) {
            throw new LaporanServiceError(
                "LAPORAN_NOT_FOUND",
                `Laporan dengan ID ${idLaporan} tidak ditemukan`,
                404
            );
        }

        return await setLaporanData(
            idLaporan,
            { statusLaporan: trimmedStatus },
            clientOverride
        );
    } catch (error) {
        rethrowAsLaporanServiceError(error);
    }
}

export async function getLaporanByIdService(
    rawIdLaporan: string | number,
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity> {
    const idLaporan = parseAndValidateIdLaporan(rawIdLaporan);
    let laporan: LaporanEntity | null;
    try {
        laporan = await getLaporanData(idLaporan, clientOverride);
    } catch (error) {
        rethrowAsLaporanServiceError(error);
    }

    if (!laporan) {
        throw new LaporanServiceError(
            "LAPORAN_NOT_FOUND",
            `Laporan dengan ID ${idLaporan} tidak ditemukan`,
            404
        );
    }

    return laporan;
}
