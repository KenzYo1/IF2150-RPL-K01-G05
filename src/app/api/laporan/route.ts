import { NextResponse } from "next/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    LaporanServiceError,
    listLaporanService,
} from "@/services/laporanService";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    LaporanEntity,
} from "@/types/laporan";


export async function handleGetAllLaporan(
    clientOverride?: LaporanSupabaseClient
): Promise<
    NextResponse<ApiSuccessResponse<LaporanEntity[]> | ApiErrorResponse>
> {
    try {
        const daftarLaporan = await listLaporanService(clientOverride);

        const responseBody: ApiSuccessResponse<LaporanEntity[]> = {
            success: true,
            data: daftarLaporan,
            message: "Daftar laporan berhasil diambil",
        };

        return NextResponse.json(responseBody, { status: 200 });
    } catch (error) {
        if (error instanceof LaporanServiceError) {
            const errorBody: ApiErrorResponse = {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                },
            };
            return NextResponse.json(errorBody, { status: error.statusCode });
        }

        const internalErrorBody: ApiErrorResponse = {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Terjadi kesalahan pada server saat mengambil daftar laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(): Promise<
    NextResponse<ApiSuccessResponse<LaporanEntity[]> | ApiErrorResponse>
> {
    return await handleGetAllLaporan();
}