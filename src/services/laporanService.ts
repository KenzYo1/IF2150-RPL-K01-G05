import {
    getAllLaporan,
    getLaporanData,
    type LaporanSupabaseClient,
} from "@/repositories/laporanRepository";
import type { LaporanEntity } from "@/types/laporan";

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

export async function listLaporanService(
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity[]> {
    return await getAllLaporan(clientOverride);
}

export async function getLaporanByIdService(
    rawIdLaporan: string | number,
    clientOverride?: LaporanSupabaseClient
): Promise<LaporanEntity> {
    const idLaporan = parseAndValidateIdLaporan(rawIdLaporan);
    const laporan = await getLaporanData(idLaporan, clientOverride);

    if (!laporan) {
        throw new LaporanServiceError(
            "LAPORAN_NOT_FOUND",
            `Laporan dengan ID ${idLaporan} tidak ditemukan`,
            404
        );
    }

    return laporan;
}