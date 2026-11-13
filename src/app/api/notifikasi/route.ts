import { NextResponse } from "next/server";
import type { NotifikasiSupabaseClient } from "@/repositories/notifikasiRepository";
import {
    getNotifikasiPelapor,
    NotifikasiServiceError,
    resolveNotifikasiAuthContext,
} from "@/services/notifikasiService";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/laporan";
import type { Notifikasi } from "@/types/notifikasi";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export async function handleGetMyNotifikasi(
    clientOverride?: NotifikasiSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<NextResponse<ApiSuccessResponse<Notifikasi[]> | ApiErrorResponse>> {
    try {
        const { idPelapor } = await resolveNotifikasiAuthContext(
            clientOverride,
            authOverride
        );

        const daftarNotifikasi = await getNotifikasiPelapor(
            idPelapor,
            clientOverride
        );

        const responseBody: ApiSuccessResponse<Notifikasi[]> = {
            success: true,
            data: daftarNotifikasi,
            message: "Daftar notifikasi berhasil diambil",
        };

        return NextResponse.json(responseBody, { status: 200 });
    } catch (error) {
        if (error instanceof NotifikasiServiceError) {
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
                message: "Terjadi kesalahan pada server saat mengambil notifikasi",
            },
        };

        return NextResponse.json(internalError, { status: 500 });
    }
}

export async function GET(): Promise<
    NextResponse<ApiSuccessResponse<Notifikasi[]> | ApiErrorResponse>
> {
    return await handleGetMyNotifikasi();
}