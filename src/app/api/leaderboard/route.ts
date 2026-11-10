import { NextResponse } from "next/server";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getTop20Pelapor,
    LeaderboardServiceError,
} from "@/services/leaderboardService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type { LeaderboardEntry } from "@/types/leaderboard";

export async function handleGetTop20Leaderboard(
    clientOverride?: PelaporSupabaseClient
): Promise<
    NextResponse<ApiSuccessResponse<LeaderboardEntry[]> | ApiErrorResponse>
> {
    try {
        const top20 = await getTop20Pelapor(clientOverride);

        const responseBody: ApiSuccessResponse<LeaderboardEntry[]> = {
            success: true,
            data: top20,
            message: "Data leaderboard berhasil diambil",
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
                message: "Terjadi kesalahan pada server saat mengambil data leaderboard",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(): Promise<
    NextResponse<ApiSuccessResponse<LeaderboardEntry[]> | ApiErrorResponse>
> {
    return await handleGetTop20Leaderboard();
}