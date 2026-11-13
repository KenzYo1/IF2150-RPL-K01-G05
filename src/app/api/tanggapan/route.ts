import { NextResponse } from "next/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    sendTanggapan,
    TanggapanServiceError,
} from "@/services/tanggapanService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type { AuthenticatedUserContext } from "@/types/pelapor";
import type {
    TanggapanActionResult,
    TanggapanRequest,
} from "@/types/tanggapan";

export async function handlePostTanggapan(
    request: Request,
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<ApiSuccessResponse<TanggapanActionResult> | ApiErrorResponse>
> {
    let body: TanggapanRequest;
    try {
        body = (await request.json()) as TanggapanRequest;
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
        const rawIdLaporan = body?.idLaporan ?? body?.id_laporan;
        if (rawIdLaporan === undefined || rawIdLaporan === null) {
            throw new TanggapanServiceError(
                "INVALID_LAPORAN_ID",
                "idLaporan wajib disertakan",
                400
            );
        }

        const hasil = await sendTanggapan(
            rawIdLaporan,
            body,
            clientOverride,
            authOverride
        );

        const responseBody: ApiSuccessResponse<TanggapanActionResult> = {
            success: true,
            data: hasil,
            message: hasil.pointsAwardedNow
                ? `Tanggapan berhasil dikirim dan pelapor memperoleh +${hasil.poinDitambahkan} poin`
                : "Tanggapan berhasil dikirim",
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
                    "Terjadi kesalahan pada server saat memproses tanggapan laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function POST(
    request: Request
): Promise<
    NextResponse<ApiSuccessResponse<TanggapanActionResult> | ApiErrorResponse>
> {
    return await handlePostTanggapan(request);
}

export async function PATCH(
    request: Request
): Promise<
    NextResponse<ApiSuccessResponse<TanggapanActionResult> | ApiErrorResponse>
> {
    return await handlePostTanggapan(request);
}

