import { NextResponse } from "next/server";
import type { LikeSupabaseClient } from "@/repositories/likeRepository";
import {
    likeLaporan,
    LikeServiceError,
    resolveAuthenticatedPelaporForLike,
    unlikeLaporan,
} from "@/services/likeService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type { LikeActionResult, LikeRequest } from "@/types/like";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export async function handlePostLike(
    request: Request,
    clientOverride?: LikeSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<ApiSuccessResponse<LikeActionResult> | ApiErrorResponse>
> {
    let body: LikeRequest;
    try {
        body = (await request.json()) as LikeRequest;
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
        const { idPelapor } = await resolveAuthenticatedPelaporForLike(
            clientOverride,
            authOverride
        );

        if (body?.idLaporan === undefined || body?.idLaporan === null) {
            throw new LikeServiceError(
                "INVALID_LAPORAN_ID",
                "idLaporan wajib disertakan",
                400
            );
        }

        const parsedIdLaporan =
            typeof body.idLaporan === "number"
                ? body.idLaporan
                : Number.parseInt(String(body.idLaporan).trim(), 10);

        const hasil = await likeLaporan(
            parsedIdLaporan,
            idPelapor,
            clientOverride
        );

        const responseBody: ApiSuccessResponse<LikeActionResult> = {
            success: true,
            data: hasil,
            message: "Like berhasil diberikan",
        };

        return NextResponse.json(responseBody, { status: 201 });
    } catch (error) {
        if (error instanceof LikeServiceError) {
            const errorBody: ApiErrorResponse = {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                },
            };
            return NextResponse.json(errorBody, { status: error.statusCode });
        }

        const internalError: ApiErrorResponse = {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Terjadi kesalahan pada server saat memproses like",
            },
        };
        return NextResponse.json(internalError, { status: 500 });
    }
}

export async function handleDeleteLike(
    request: Request,
    clientOverride?: LikeSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<ApiSuccessResponse<LikeActionResult> | ApiErrorResponse>
> {
    let body: LikeRequest = {};
    try {
        body = (await request.json()) as LikeRequest;
    } catch {
        const url = new URL(request.url);
        const queryId = url.searchParams.get("idLaporan");
        if (queryId !== null) {
            body = { idLaporan: queryId };
        } else {
            const invalidJson: ApiErrorResponse = {
                success: false,
                error: {
                    code: "INVALID_JSON_BODY",
                    message: "Request body harus berupa JSON yang valid",
                },
            };
            return NextResponse.json(invalidJson, { status: 400 });
        }
    }

    try {
        const { idPelapor } = await resolveAuthenticatedPelaporForLike(
            clientOverride,
            authOverride
        );

        if (body?.idLaporan === undefined || body?.idLaporan === null) {
            throw new LikeServiceError(
                "INVALID_LAPORAN_ID",
                "idLaporan wajib disertakan",
                400
            );
        }

        const parsedIdLaporan =
            typeof body.idLaporan === "number"
                ? body.idLaporan
                : Number.parseInt(String(body.idLaporan).trim(), 10);

        const hasil = await unlikeLaporan(
            parsedIdLaporan,
            idPelapor,
            clientOverride
        );

        const responseBody: ApiSuccessResponse<LikeActionResult> = {
            success: true,
            data: hasil,
            message: "Like berhasil dibatalkan",
        };

        return NextResponse.json(responseBody, { status: 200 });
    } catch (error) {
        if (error instanceof LikeServiceError) {
            const errorBody: ApiErrorResponse = {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                },
            };
            return NextResponse.json(errorBody, { status: error.statusCode });
        }

        const internalError: ApiErrorResponse = {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Terjadi kesalahan pada server saat membatalkan like",
            },
        };
        return NextResponse.json(internalError, { status: 500 });
    }
}

export async function POST(
    request: Request
): Promise<
    NextResponse<ApiSuccessResponse<LikeActionResult> | ApiErrorResponse>
> {
    return await handlePostLike(request);
}

export async function DELETE(
    request: Request
): Promise<
    NextResponse<ApiSuccessResponse<LikeActionResult> | ApiErrorResponse>
> {
    return await handleDeleteLike(request);
}