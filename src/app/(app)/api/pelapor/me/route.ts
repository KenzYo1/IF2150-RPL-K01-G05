import { NextResponse } from "next/server";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getMyPelaporProfileService,
    PelaporServiceError,
} from "@/services/pelaporService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type {
    AuthenticatedUserContext,
    PelaporEntity,
} from "@/types/pelapor";

export async function handleGetMyPelaporProfile(
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<NextResponse<ApiSuccessResponse<PelaporEntity> | ApiErrorResponse>> {
    try {
        const profil = await getMyPelaporProfileService(
            clientOverride,
            authOverride
        );

        const responseBody: ApiSuccessResponse<PelaporEntity> = {
            success: true,
            data: profil,
            message: "Data akun pelapor berhasil diambil",
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
                message: "Terjadi kesalahan pada server saat mengambil data akun pelapor",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(): Promise<
    NextResponse<ApiSuccessResponse<PelaporEntity> | ApiErrorResponse>
> {
    return await handleGetMyPelaporProfile();
}