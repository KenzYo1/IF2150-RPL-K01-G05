import {
    getLaporanData,
    LaporanRepositoryError,
    type LaporanSupabaseClient,
    setLaporanData,
} from "@/repositories/laporanRepository";
import type { NotifikasiSupabaseClient } from "@/repositories/notifikasiRepository";
import {
    getDataPelapor,
    PelaporRepositoryError,
    type PelaporSupabaseClient,
    updateDataPelapor,
} from "@/repositories/pelaporRepository";
import {
    LaporanServiceError,
    parseAndValidateIdLaporan,
} from "@/services/laporanService";
import {
    createNotifikasi,
    sendNotifikasi,
} from "@/services/notifikasiService";
import {
    parseAndValidateIdPelapor,
    PelaporServiceError,
    resolvePelaporAuthContext,
} from "@/services/pelaporService";
import type { LaporanEntity, StatusLaporan } from "@/types/laporan";
import type { Notifikasi } from "@/types/notifikasi";
import type { AuthenticatedUserContext } from "@/types/pelapor";
import type {
    AddPoinPelaporResult,
    TanggapanActionResult,
    TanggapanInput,
} from "@/types/tanggapan";

export const DEFAULT_POIN_LAPORAN_VALID = 1;

export const VALID_STATUS_FOR_POIN = [
    "valid",
    "dalam penanganan",
    "selesai",
] as const;

export const REJECTED_STATUS_VALUES = [
    "ditolak",
    "invalid",
] as const;

export class TanggapanServiceError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode: number) {
        super(message);
        this.name = "TanggapanServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

export function isStatusValidForPoin(
    status: string | null | undefined
): boolean {
    if (typeof status !== "string") {
        return false;
    }
    const normalized = status.trim().toLowerCase();
    return (VALID_STATUS_FOR_POIN as readonly string[]).includes(normalized);
}

export function isStatusRejected(status: string | null | undefined): boolean {
    if (typeof status !== "string") {
        return false;
    }
    const normalized = status.trim().toLowerCase();
    return (REJECTED_STATUS_VALUES as readonly string[]).includes(normalized);
}

export async function resolveTanggapanActorContext(
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<AuthenticatedUserContext> {
    let user: AuthenticatedUserContext;
    try {
        user = await resolvePelaporAuthContext(
            clientOverride as unknown as PelaporSupabaseClient | undefined,
            authOverride
        );
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new TanggapanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    if (user.role !== "petugas" && user.role !== "admin") {
        throw new TanggapanServiceError(
            "FORBIDDEN",
            "Hanya Petugas atau Admin yang dapat memberikan tanggapan dan mengubah status laporan",
            403
        );
    }

    return user;
}

export async function addPoinPelapor(
    idPelapor: number | string,
    poin = DEFAULT_POIN_LAPORAN_VALID,
    clientOverride?: PelaporSupabaseClient
): Promise<AddPoinPelaporResult> {
    let validIdPelapor: number;
    try {
        validIdPelapor = parseAndValidateIdPelapor(idPelapor);
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new TanggapanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    if (typeof poin !== "number" || !Number.isInteger(poin) || poin <= 0) {
        throw new TanggapanServiceError(
            "INVALID_POIN_VALUE",
            "Jumlah poin yang ditambahkan harus berupa bilangan bulat positif",
            400
        );
    }

    try {
        const pelapor = await getDataPelapor(validIdPelapor, clientOverride);
        if (!pelapor) {
            throw new TanggapanServiceError(
                "PELAPOR_NOT_FOUND",
                `Pelapor dengan ID ${validIdPelapor} tidak ditemukan`,
                404
            );
        }

        const poinLama = Math.max(0, pelapor.poinPelapor);
        const poinBaru = poinLama + poin;

        const updated = await updateDataPelapor(
            validIdPelapor,
            poinBaru,
            clientOverride
        );
        if (!updated) {
            throw new TanggapanServiceError(
                "POIN_UPDATE_FAILED",
                "Gagal memperbarui poin pelapor di database",
                500
            );
        }

        return {
            idPelapor: validIdPelapor,
            poinLama,
            poinDitambahkan: poin,
            poinBaru,
        };
    } catch (error) {
        if (error instanceof TanggapanServiceError) {
            throw error;
        }
        if (error instanceof PelaporRepositoryError) {
            throw new TanggapanServiceError(error.code, error.message, 500);
        }
        throw error;
    }
}

export async function setStatusLaporan(
    rawIdLaporan: number | string,
    statusLaporan: StatusLaporan,
    extraUpdates?: Partial<LaporanEntity>,
    clientOverride?: LaporanSupabaseClient
): Promise<boolean> {
    let idLaporan: number;
    try {
        idLaporan = parseAndValidateIdLaporan(rawIdLaporan);
    } catch (error) {
        if (error instanceof LaporanServiceError) {
            throw new TanggapanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    const trimmedStatus =
        typeof statusLaporan === "string" ? statusLaporan.trim() : "";
    if (!trimmedStatus) {
        throw new TanggapanServiceError(
            "INVALID_STATUS_LAPORAN",
            "Status laporan atau tanggapan tidak boleh kosong",
            400
        );
    }

    try {
        return await setLaporanData(
            idLaporan,
            {
                ...extraUpdates,
                statusLaporan: trimmedStatus,
            },
            clientOverride
        );
    } catch (error) {
        if (error instanceof LaporanRepositoryError) {
            throw new TanggapanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }
}

function normalizeTanggapanInput(
    rawInput: TanggapanInput | StatusLaporan
): {
    statusBaru: string;
    statusModerasi?: string | null;
    statusPenanganan?: string | null;
    catatan?: string | null;
    poin: number;
} {
    if (typeof rawInput === "string") {
        return {
            statusBaru: rawInput.trim(),
            poin: DEFAULT_POIN_LAPORAN_VALID,
        };
    }

    const rawStatus =
        rawInput.statusLaporan ??
        rawInput.tanggapan ??
        rawInput.status ??
        rawInput.statusPenanganan ??
        rawInput.statusTuntasLaporan ??
        rawInput.statusModerasi ??
        "";

    const statusBaru = typeof rawStatus === "string" ? rawStatus.trim() : "";

    const statusModerasi =
        rawInput.statusModerasi !== undefined
            ? typeof rawInput.statusModerasi === "string"
                ? rawInput.statusModerasi.trim() || null
                : null
            : undefined;

    const rawPenanganan =
        rawInput.statusPenanganan ?? rawInput.statusTuntasLaporan;
    const statusPenanganan =
        rawPenanganan !== undefined
            ? typeof rawPenanganan === "string"
                ? rawPenanganan.trim() || null
                : null
            : undefined;

    const rawCatatan = rawInput.catatan ?? rawInput.komentar;
    const catatan =
        rawCatatan !== undefined
            ? typeof rawCatatan === "string"
                ? rawCatatan.trim() || null
                : null
            : undefined;

    const poin =
        typeof rawInput.poin === "number" &&
            Number.isInteger(rawInput.poin) &&
            rawInput.poin > 0
            ? rawInput.poin
            : DEFAULT_POIN_LAPORAN_VALID;

    return {
        statusBaru,
        statusModerasi,
        statusPenanganan,
        catatan,
        poin,
    };
}

function buildNotifikasiPesanForTanggapan(
    laporan: LaporanEntity,
    statusBaru: string,
    catatan: string | null | undefined,
    poinDitambahkan: number
): string {
    const labelLaporan = laporan.judulLaporan?.trim()
        ? `"${laporan.judulLaporan.trim()}"`
        : `#${laporan.idLaporan}`;
    const catatanSuffix = catatan ? ` Catatan: ${catatan}` : "";

    if (poinDitambahkan > 0) {
        return `Laporan ${labelLaporan} telah dinyatakan valid dengan status "${statusBaru}". Anda memperoleh +${poinDitambahkan} poin!${catatanSuffix}`;
    }

    if (isStatusRejected(statusBaru)) {
        return `Laporan ${labelLaporan} tidak dapat diproses (status: "${statusBaru}").${catatanSuffix}`;
    }

    return `Status laporan ${labelLaporan} diperbarui menjadi "${statusBaru}".${catatanSuffix}`;
}

export async function sendTanggapan(
    rawIdLaporan: number | string,
    rawInput: TanggapanInput | StatusLaporan,
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<TanggapanActionResult> {
    await resolveTanggapanActorContext(clientOverride, authOverride);

    let idLaporan: number;
    try {
        idLaporan = parseAndValidateIdLaporan(rawIdLaporan);
    } catch (error) {
        if (error instanceof LaporanServiceError) {
            throw new TanggapanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    const normalized = normalizeTanggapanInput(rawInput);
    if (!normalized.statusBaru) {
        throw new TanggapanServiceError(
            "INVALID_STATUS_LAPORAN",
            "Status laporan atau tanggapan wajib diisi",
            400
        );
    }

    let existingLaporan: LaporanEntity | null;
    try {
        existingLaporan = await getLaporanData(idLaporan, clientOverride);
    } catch (error) {
        if (error instanceof LaporanRepositoryError) {
            throw new TanggapanServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    if (!existingLaporan) {
        throw new TanggapanServiceError(
            "LAPORAN_NOT_FOUND",
            `Laporan dengan ID ${idLaporan} tidak ditemukan`,
            404
        );
    }

    const isValidNow =
        isStatusValidForPoin(normalized.statusBaru) ||
        isStatusValidForPoin(normalized.statusModerasi) ||
        isStatusValidForPoin(normalized.statusPenanganan);

    const wasAlreadyValidated =
        Boolean(existingLaporan.pointsAwarded) ||
        isStatusValidForPoin(existingLaporan.statusLaporan) ||
        isStatusValidForPoin(existingLaporan.statusModerasi) ||
        isStatusValidForPoin(existingLaporan.statusPenanganan);

    const hasValidOwner =
        typeof existingLaporan.idPelapor === "number" &&
        Number.isInteger(existingLaporan.idPelapor) &&
        existingLaporan.idPelapor > 0;

    const shouldAwardPoints =
        isValidNow && !wasAlreadyValidated && hasValidOwner;

    const updateFields: Partial<LaporanEntity> = {};
    if (normalized.statusModerasi !== undefined) {
        updateFields.statusModerasi = normalized.statusModerasi;
    }
    if (normalized.statusPenanganan !== undefined) {
        updateFields.statusPenanganan = normalized.statusPenanganan;
    }
    if (normalized.catatan !== undefined) {
        updateFields.catatan = normalized.catatan;
    }
    if (shouldAwardPoints || existingLaporan.pointsAwarded) {
        updateFields.pointsAwarded = true;
    }

    const updated = await setStatusLaporan(
        idLaporan,
        normalized.statusBaru,
        updateFields,
        clientOverride
    );

    if (!updated) {
        throw new TanggapanServiceError(
            "TANGGAPAN_UPDATE_FAILED",
            "Gagal menyimpan perubahan status laporan di database",
            500
        );
    }

    let pointsAwardedNow = false;
    let poinDitambahkan = 0;
    let poinPelaporBaru: number | null = null;

    if (shouldAwardPoints && existingLaporan.idPelapor !== null) {
        const hasilPoin = await addPoinPelapor(
            existingLaporan.idPelapor,
            normalized.poin,
            clientOverride as unknown as PelaporSupabaseClient | undefined
        );
        pointsAwardedNow = true;
        poinDitambahkan = hasilPoin.poinDitambahkan;
        poinPelaporBaru = hasilPoin.poinBaru;
    }

    let notifikasiSent = false;
    let notifikasi: Notifikasi | null = null;

    if (hasValidOwner && existingLaporan.idPelapor !== null) {
        try {
            const pesanNotif = buildNotifikasiPesanForTanggapan(
                existingLaporan,
                normalized.statusBaru,
                normalized.catatan,
                poinDitambahkan
            );
            const createdNotif = await createNotifikasi(
                existingLaporan.idPelapor,
                pesanNotif,
                clientOverride as unknown as NotifikasiSupabaseClient | undefined
            );
            notifikasiSent = await sendNotifikasi(
                createdNotif,
                clientOverride as unknown as NotifikasiSupabaseClient | undefined
            );
            notifikasi = createdNotif;
        } catch {
            // Jangan gagalkan tanggapan jika tabel notifikasi belum siap
            notifikasiSent = false;
            notifikasi = null;
        }
    }

    let finalLaporan: LaporanEntity = {
        ...existingLaporan,
        statusLaporan: normalized.statusBaru,
        statusModerasi:
            normalized.statusModerasi !== undefined
                ? normalized.statusModerasi
                : existingLaporan.statusModerasi,
        statusPenanganan:
            normalized.statusPenanganan !== undefined
                ? normalized.statusPenanganan
                : existingLaporan.statusPenanganan,
        catatan:
            normalized.catatan !== undefined
                ? normalized.catatan
                : existingLaporan.catatan,
        pointsAwarded: existingLaporan.pointsAwarded || pointsAwardedNow,
    };

    try {
        const refreshed = await getLaporanData(idLaporan, clientOverride);
        if (refreshed) {
            finalLaporan = {
                ...refreshed,
                pointsAwarded: refreshed.pointsAwarded || pointsAwardedNow,
            };
        }
    } catch {
        // Gunakan objek finalLaporan jika re-fetch gagal
    }

    return {
        laporan: finalLaporan,
        pointsAwardedNow,
        poinDitambahkan,
        poinPelaporBaru,
        notifikasiSent,
        notifikasi,
    };
}

