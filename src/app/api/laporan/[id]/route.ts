import { NextResponse } from "next/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    getLaporanByIdService,
    LaporanServiceError,
} from "@/services/laporanService";
import {
    sendTanggapan,
    TanggapanServiceError,
} from "@/services/tanggapanService";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    LaporanEntity,
} from "@/types/laporan";
import type { AuthenticatedUserContext } from "@/types/pelapor";
import type {
    TanggapanActionResult,
    TanggapanInput,
} from "@/types/tanggapan";

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
                message:
                    "Terjadi kesalahan pada server saat mengambil data laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function handleUpdateLaporanById(
    request: Request,
    context: LaporanRouteContext,
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<ApiSuccessResponse<TanggapanActionResult> | ApiErrorResponse>
> {
    let body: TanggapanInput;
    try {
        body = (await request.json()) as TanggapanInput;
    } catch {
        const invalidJson: ApiErrorResponse = {
            success: false,
            error: {
                code: "INVALID_JSON_BODY",
                message: "Request body harus berupa JSON yang valid",
            },
        };
        return NextResponse.json(invalidJson, { status: 400 });
    }

    try {
        const resolvedParams = await Promise.resolve(context?.params);
        const rawId = resolvedParams?.id ?? "";

        const hasil = await sendTanggapan(
            rawId,
            body,
            clientOverride,
            authOverride
        );

        const responseBody: ApiSuccessResponse<TanggapanActionResult> = {
            success: true,
            data: hasil,
            message: hasil.pointsAwardedNow
                ? `Tanggapan berhasil disimpan dan pelapor memperoleh +${hasil.poinDitambahkan} poin`
                : "Tanggapan dan status laporan berhasil diperbarui",
        };

        return NextResponse.json(responseBody, { status: 200 });
    } catch (error) {
        if (error instanceof TanggapanServiceError) {
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
                message:
                    "Terjadi kesalahan pada server saat memperbarui status laporan",
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

export async function PATCH(
    request: Request,
    context: LaporanRouteContext
): Promise<
    NextResponse<ApiSuccessResponse<TanggapanActionResult> | ApiErrorResponse>
> {
    return await handleUpdateLaporanById(request, context);
}

export async function PUT(
    request: Request,
    context: LaporanRouteContext
): Promise<
    NextResponse<ApiSuccessResponse<TanggapanActionResult> | ApiErrorResponse>
> {
    return await handleUpdateLaporanById(request, context);
}
