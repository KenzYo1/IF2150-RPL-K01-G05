import { NextResponse } from "next/server";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getPelaporByIdService,
    PelaporServiceError,
} from "@/services/pelaporService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type {
    AuthenticatedUserContext,
    PelaporEntity,
    PublicPelaporData,
} from "@/types/pelapor";

export interface PelaporRouteContext {
    params: Promise<{ id: string }> | { id: string };
}

export async function handleGetPelaporById(
    context: PelaporRouteContext,
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<
        ApiSuccessResponse<PelaporEntity | PublicPelaporData> | ApiErrorResponse
    >
> {
    try {
        const resolvedParams = await Promise.resolve(context?.params);
        const rawId = resolvedParams?.id ?? "";

        const dataPelapor = await getPelaporByIdService(
            rawId,
            clientOverride,
            authOverride
        );

        const responseBody: ApiSuccessResponse<PelaporEntity | PublicPelaporData> =
            {
                success: true,
                data: dataPelapor,
                message: "Data pelapor berhasil diambil",
            };

        return NextResponse.json(responseBody, { status: 200 });
    } catch (error) {
        if (error instanceof PelaporServiceError) {
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
                message: "Terjadi kesalahan pada server saat mengambil data pelapor",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(
    _request: Request,
    context: PelaporRouteContext
): Promise<
    NextResponse<
        ApiSuccessResponse<PelaporEntity | PublicPelaporData> | ApiErrorResponse
    >
> {
    return await handleGetPelaporById(context);
}