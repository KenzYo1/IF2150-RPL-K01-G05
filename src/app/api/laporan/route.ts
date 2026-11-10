import { NextResponse } from "next/server";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    createLaporanService,
    LaporanServiceError,
    listLaporanService,
} from "@/services/laporanService";
import type {
    ApiErrorResponse,
    ApiSuccessResponse,
    CreateLaporanInput,
    LaporanEntity,
} from "@/types/laporan";
import type { AuthenticatedUserContext } from "@/types/pelapor";

export async function handleGetAllLaporan(
    clientOverride?: LaporanSupabaseClient
): Promise<
    NextResponse<ApiSuccessResponse<LaporanEntity[]> | ApiErrorResponse>
> {
    try {
        const daftarLaporan = await listLaporanService(clientOverride);

        const responseBody: ApiSuccessResponse<LaporanEntity[]> = {
            success: true,
            data: daftarLaporan,
            message: "Daftar laporan berhasil diambil",
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
                    "Terjadi kesalahan pada server saat mengambil daftar laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

async function parseCreateLaporanRequest(
    request: Request
): Promise<CreateLaporanInput> {
    const contentType = (
        request.headers.get("content-type") ?? ""
    ).toLowerCase();

    if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();

        const rawJudul =
            formData.get("judulLaporan") ?? formData.get("judul") ?? null;
        const rawDeskripsi =
            formData.get("descLaporan") ?? formData.get("deskripsi") ?? "";
        const rawLokasi = formData.get("lokasi") ?? null;
        const rawKategori = formData.get("kategori") ?? null;
        const rawIdPelapor =
            formData.get("idPelapor") ?? formData.get("id_pelapor") ?? null;
        const rawFotoUrl =
            formData.get("fotoLaporan") ?? formData.get("foto_url") ?? null;
        const rawFotoFile = formData.get("foto") ?? formData.get("file");

        const fotoFile =
            rawFotoFile &&
            typeof rawFotoFile === "object" &&
            "arrayBuffer" in rawFotoFile &&
            "size" in rawFotoFile
                ? (rawFotoFile as File)
                : null;

        let idPelapor: number | null = null;
        if (typeof rawIdPelapor === "string" && rawIdPelapor.trim().length > 0) {
            const parsedId = Number.parseInt(rawIdPelapor.trim(), 10);
            if (!Number.isNaN(parsedId) && parsedId > 0) {
                idPelapor = parsedId;
            }
        }

        return {
            idPelapor,
            judulLaporan: typeof rawJudul === "string" ? rawJudul : null,
            kategori: typeof rawKategori === "string" ? rawKategori : null,
            descLaporan: typeof rawDeskripsi === "string" ? rawDeskripsi : "",
            lokasi: typeof rawLokasi === "string" ? rawLokasi : null,
            fotoFile,
            fotoLaporan: typeof rawFotoUrl === "string" ? rawFotoUrl : null,
        };
    }

    const body = (await request.json()) as Record<string, unknown>;
    const rawIdPelapor = body.idPelapor ?? body.id_pelapor;
    const idPelapor =
        typeof rawIdPelapor === "number"
            ? rawIdPelapor
            : typeof rawIdPelapor === "string" && rawIdPelapor.trim().length > 0
              ? Number.parseInt(rawIdPelapor.trim(), 10)
              : null;

    return {
        idPelapor:
            typeof idPelapor === "number" && !Number.isNaN(idPelapor)
                ? idPelapor
                : null,
        judulLaporan:
            typeof (body.judulLaporan ?? body.judul) === "string"
                ? ((body.judulLaporan ?? body.judul) as string)
                : null,
        kategori: typeof body.kategori === "string" ? body.kategori : null,
        descLaporan:
            typeof (body.descLaporan ?? body.deskripsi) === "string"
                ? ((body.descLaporan ?? body.deskripsi) as string)
                : "",
        lokasi: typeof body.lokasi === "string" ? body.lokasi : null,
        fotoLaporan:
            typeof (body.fotoLaporan ?? body.foto_url ?? body.foto) === "string"
                ? ((body.fotoLaporan ?? body.foto_url ?? body.foto) as string)
                : null,
    };
}

export async function handleCreateLaporan(
    request: Request,
    clientOverride?: LaporanSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<NextResponse<ApiSuccessResponse<LaporanEntity> | ApiErrorResponse>> {
    let input: CreateLaporanInput;
    try {
        input = await parseCreateLaporanRequest(request);
    } catch {
        const invalidBody: ApiErrorResponse = {
            success: false,
            error: {
                code: "INVALID_REQUEST_BODY",
                message:
                    "Request body harus berupa multipart/form-data atau JSON yang valid",
            },
        };
        return NextResponse.json(invalidBody, { status: 400 });
    }

    try {
        const laporanBaru = await createLaporanService(
            input,
            clientOverride,
            authOverride
        );

        const responseBody: ApiSuccessResponse<LaporanEntity> = {
            success: true,
            data: laporanBaru,
            message: "Laporan berhasil dikirim",
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
                message: "Terjadi kesalahan pada server saat membuat laporan",
            },
        };

        return NextResponse.json(internalErrorBody, { status: 500 });
    }
}

export async function GET(): Promise<
    NextResponse<ApiSuccessResponse<LaporanEntity[]> | ApiErrorResponse>
> {
    return await handleGetAllLaporan();
}

export async function POST(
    request: Request
): Promise<NextResponse<ApiSuccessResponse<LaporanEntity> | ApiErrorResponse>> {
    return await handleCreateLaporan(request);
}
