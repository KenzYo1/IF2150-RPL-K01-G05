import { NextResponse } from "next/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    LaporanServiceError,
    uploadFotoLaporanService,
} from "@/services/laporanService";
import {
    PelaporServiceError,
    resolvePelaporAuthContext,
} from "@/services/pelaporService";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    FotoStorageUploadResult,
} from "@/types/laporan";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export async function handleUploadFotoLaporan(
    request: Request,
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<
    NextResponse<ApiSuccessResponse<FotoStorageUploadResult> | ApiErrorResponse>
> {
    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        const invalidBody: ApiErrorResponse = {
            success: false,
            error: {
                code: "INVALID_FORM_DATA",
                message:
                    "Request harus berupa multipart/form-data dengan file foto",
            },
        };
        return NextResponse.json(invalidBody, { status: 400 });
    }

    try {
        let idPelapor: number | null = null;
        try {
            const authUser = await resolvePelaporAuthContext(
                clientOverride as unknown as PelaporSupabaseClient | undefined,
                authOverride
            );
            idPelapor = authUser.idPelapor ?? null;
        } catch (error) {
            if (error instanceof PelaporServiceError) {
                throw new LaporanServiceError(
                    error.code,
                    error.message,
                    error.statusCode
                );
            }
            throw error;
        }

        const rawFile = formData.get("foto") ?? formData.get("file");
        if (
            !rawFile ||
            typeof rawFile !== "object" ||
            !("arrayBuffer" in rawFile) ||
            !("size" in rawFile)
        ) {
            throw new LaporanServiceError(
                "MISSING_FOTO_FILE",
                "File foto bukti laporan wajib diunggah pada field 'foto' atau 'file'",
                400
            );
        }

        const uploadResult = await uploadFotoLaporanService(
            rawFile as File,
            { idPelapor },
            clientOverride
        );

        const responseBody: ApiSuccessResponse<FotoStorageUploadResult> = {
            success: true,
            data: uploadResult,
            message: "Foto bukti laporan berhasil diunggah ke Supabase Storage",
        };

        return NextResponse.json(responseBody, { status: 201 });
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
                    "Terjadi kesalahan pada server saat mengunggah foto bukti laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function POST(
    request: Request
): Promise<
    NextResponse<ApiSuccessResponse<FotoStorageUploadResult> | ApiErrorResponse>
> {
    return await handleUploadFotoLaporan(request);
}

