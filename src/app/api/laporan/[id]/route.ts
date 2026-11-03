import { NextResponse } from "next/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    getLaporanByIdService,
    LaporanServiceError,
} from "@/services/laporanService";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    LaporanEntity,
} from "@/types/laporan";

export interface LaporanRouteContext {
    params: Promise<{ id: string }> | { id: string };
}


export async function handleGetLaporanById(
    context: LaporanRouteContext,
    clientOverride?: LaporanSupabaseClient
): Promise<NextResponse<ApiSuccessResponse<LaporanEntity> | ApiErrorResponse>> {
    try {
        const resolvedParams = await Promise.resolve(context?.params);
        const rawId = resolvedParams?.id ?? "";

        const laporan = await getLaporanByIdService(rawId, clientOverride);

        const responseBody: ApiSuccessResponse<LaporanEntity> = {
            success: true,
            data: laporan,
            message: "Data laporan berhasil diambil",
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
                message: "Terjadi kesalahan pada server saat mengambil data laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(
    _request: Request,
    context: LaporanRouteContext
): Promise<NextResponse<ApiSuccessResponse<LaporanEntity> | ApiErrorResponse>> {
    return await handleGetLaporanById(context);
}