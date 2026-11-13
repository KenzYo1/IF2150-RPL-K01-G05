import {
    getLaporanData,
    setLaporanData,
} from "@/repositories/laporanRepository";
import {
    deleteLikeRecord,
    findLikeRecord,
    getLikedLaporanIdsByPelapor,
    insertLikeRecord,
    LikeRepositoryError,
    type LikeSupabaseClient,
} from "@/repositories/likeRepository";
import {
    getDataPelaporByAuthUserId,
    getDataPelaporByEmail,
    type PelaporSupabaseClient,
} from "@/repositories/pelaporRepository";
import {
    LaporanServiceError,
    parseAndValidateIdLaporan,
} from "@/services/laporanService";
import {
    parseAndValidateIdPelapor,
    PelaporServiceError,
    resolvePelaporAuthContext,
} from "@/services/pelaporService";
import type { LikeActionResult } from "@/types/like";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export class LikeServiceError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode: number) {
        super(message);
        this.name = "LikeServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

function normalizeValidationIds(
    rawIdLaporan: string | number,
    rawIdPelapor: string | number
): { idLaporan: number; idPelapor: number } {
    try {
        const idLaporan = parseAndValidateIdLaporan(rawIdLaporan);
        const idPelapor = parseAndValidateIdPelapor(rawIdPelapor);
        return { idLaporan, idPelapor };
    } catch (error) {
        if (
            error instanceof LaporanServiceError ||
            error instanceof PelaporServiceError
        ) {
            throw new LikeServiceError(error.code, error.message, error.statusCode);
        }
        throw error;
    }
}

export async function getLikedLaporanIdsByPelaporService(
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<number[]> {
    let validIdPelapor: number;
    try {
        validIdPelapor = parseAndValidateIdPelapor(idPelapor);
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new LikeServiceError(error.code, error.message, error.statusCode);
        }
        throw error;
    }

    return await getLikedLaporanIdsByPelapor(validIdPelapor, clientOverride);
}

export async function isLaporanLiked(
    idLaporan: number,
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<boolean> {
    const valid = normalizeValidationIds(idLaporan, idPelapor);
    const record = await findLikeRecord(
        valid.idLaporan,
        valid.idPelapor,
        clientOverride
    );
    return record !== null;
}

export async function likeLaporan(
    idLaporan: number,
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<LikeActionResult> {
    const valid = normalizeValidationIds(idLaporan, idPelapor);

    const laporan = await getLaporanData(valid.idLaporan, clientOverride);
    if (!laporan) {
        throw new LikeServiceError(
            "LAPORAN_NOT_FOUND",
            `Laporan dengan ID ${valid.idLaporan} tidak ditemukan`,
            404
        );
    }

    const sudahLike = await isLaporanLiked(
        valid.idLaporan,
        valid.idPelapor,
        clientOverride
    );
    if (sudahLike) {
        throw new LikeServiceError(
            "DUPLICATE_LIKE",
            "Anda sudah memberikan like pada laporan ini",
            409
        );
    }

    try {
        await insertLikeRecord(valid.idLaporan, valid.idPelapor, clientOverride);
    } catch (error) {
        if (error instanceof LikeRepositoryError && error.code === "23505") {
            throw new LikeServiceError(
                "DUPLICATE_LIKE",
                "Anda sudah memberikan like pada laporan ini",
                409
            );
        }
        throw error;
    }

    const jumlahLikeBaru = Math.max(0, laporan.likeLaporan) + 1;

    try {
        const updated = await setLaporanData(
            valid.idLaporan,
            { likeLaporan: jumlahLikeBaru },
            clientOverride
        );
        if (!updated) {
            throw new LikeServiceError(
                "LIKE_UPDATE_FAILED",
                "Gagal memperbarui jumlah like pada laporan di database",
                500
            );
        }
    } catch (updateError) {
        await deleteLikeRecord(
            valid.idLaporan,
            valid.idPelapor,
            clientOverride
        ).catch(() => undefined);
        throw updateError;
    }

    return {
        idLaporan: valid.idLaporan,
        idPelapor: valid.idPelapor,
        liked: true,
        jumlahLike: jumlahLikeBaru,
    };
}

export async function unlikeLaporan(
    idLaporan: number,
    idPelapor: number,
    clientOverride?: LikeSupabaseClient
): Promise<LikeActionResult> {
    const valid = normalizeValidationIds(idLaporan, idPelapor);

    const laporan = await getLaporanData(valid.idLaporan, clientOverride);
    if (!laporan) {
        throw new LikeServiceError(
            "LAPORAN_NOT_FOUND",
            `Laporan dengan ID ${valid.idLaporan} tidak ditemukan`,
            404
        );
    }

    const sudahLike = await isLaporanLiked(
        valid.idLaporan,
        valid.idPelapor,
        clientOverride
    );
    if (!sudahLike) {
        throw new LikeServiceError(
            "LIKE_NOT_FOUND",
            "Anda belum memberikan like pada laporan ini",
            404
        );
    }

    const deleted = await deleteLikeRecord(
        valid.idLaporan,
        valid.idPelapor,
        clientOverride
    );
    if (!deleted) {
        throw new LikeServiceError(
            "LIKE_NOT_FOUND",
            "Data like tidak ditemukan untuk dibatalkan",
            404
        );
    }

    const jumlahLikeBaru = Math.max(0, laporan.likeLaporan - 1);

    const updated = await setLaporanData(
        valid.idLaporan,
        { likeLaporan: jumlahLikeBaru },
        clientOverride
    );
    if (!updated) {
        throw new LikeServiceError(
            "UNLIKE_UPDATE_FAILED",
            "Gagal memperbarui jumlah like pada laporan di database",
            500
        );
    }

    return {
        idLaporan: valid.idLaporan,
        idPelapor: valid.idPelapor,
        liked: false,
        jumlahLike: jumlahLikeBaru,
    };
}

export async function resolveAuthenticatedPelaporForLike(
    clientOverride?: LikeSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<{ idPelapor: number }> {
    let user: AuthenticatedUserContext;
    try {
        user = await resolvePelaporAuthContext(
            clientOverride as unknown as PelaporSupabaseClient | undefined,
            authOverride
        );
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new LikeServiceError(error.code, error.message, error.statusCode);
        }
        throw error;
    }

    if (user.role !== "pelapor") {
        throw new LikeServiceError(
            "FORBIDDEN",
            "Hanya Pelapor yang dapat memberikan atau membatalkan like",
            403
        );
    }

    if (typeof user.idPelapor === "number" && user.idPelapor > 0) {
        return { idPelapor: user.idPelapor };
    }

    const pelaporClient = clientOverride as unknown as PelaporSupabaseClient | undefined;
    let resolvedIdPelapor: number | null = null;

    if (user.authUserId) {
        const pelaporByAuth = await getDataPelaporByAuthUserId(
            user.authUserId,
            pelaporClient
        ).catch(() => null);
        resolvedIdPelapor = pelaporByAuth?.idPelapor ?? null;
    }

    if (resolvedIdPelapor === null && user.email) {
        const pelaporByEmail = await getDataPelaporByEmail(
            user.email,
            pelaporClient
        ).catch(() => null);
        resolvedIdPelapor = pelaporByEmail?.idPelapor ?? null;
    }

    if (typeof resolvedIdPelapor !== "number" || resolvedIdPelapor <= 0) {
        throw new LikeServiceError(
            "INVALID_PELAPOR_SESSION",
            "Profil pelapor tidak ditemukan pada sesi login",
            401
        );
    }

    return { idPelapor: resolvedIdPelapor };
}