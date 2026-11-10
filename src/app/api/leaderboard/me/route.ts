import { NextResponse } from "next/server";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getMyLeaderboardService,
    LeaderboardServiceError,
} from "@/services/leaderboardService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type { MyLeaderboardData } from "@/types/leaderboard";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export async function handleGetMyLeaderboard(
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<ApiSuccessResponse<MyLeaderboardData> | ApiErrorResponse>
> {
    try {
        const dataPeringkatSaya = await getMyLeaderboardService(
            clientOverride,
            authOverride
        );

        const responseBody: ApiSuccessResponse<MyLeaderboardData> = {
            success: true,
            data: dataPeringkatSaya,
            message: "Data peringkat pelapor berhasil diambil",
        };

        return NextResponse.json(responseBody, { status: 200 });
    } catch (error) {
        if (error instanceof LeaderboardServiceError) {
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
                    "Terjadi kesalahan pada server saat mengambil data peringkat pelapor",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(): Promise<
    NextResponse<ApiSuccessResponse<MyLeaderboardData> | ApiErrorResponse>
> {
    return await handleGetMyLeaderboard();
}