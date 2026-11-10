import { createClient } from "@/lib/supabase/server";
import {
    getNotifikasiByIdRecord,
    getNotifikasiByPelaporRecord,
    insertNotifikasiRecord,
    type NotifikasiSupabaseClient,
    updateStatusNotifikasiRecord,
} from "@/repositories/notifikasiRepository";
import {
    parseAndValidateIdPelapor,
    PelaporServiceError,
} from "@/services/pelaporService";
import type { Notifikasi } from "@/types/notifikasi";
import type { AuthenticatedUserContext } from "@/types/pelapor";
import type { Role } from "@/types/role";

export class NotifikasiServiceError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode: number) {
        super(message);
        this.name = "NotifikasiServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

export function parseAndValidateIdNotifikasi(rawId: string | number): number {
    if (typeof rawId === "number") {
        if (!Number.isInteger(rawId) || rawId <= 0) {
            throw new NotifikasiServiceError(
                "INVALID_NOTIFIKASI_ID",
                "ID notifikasi harus berupa bilangan bulat positif",
                400
            );
        }
        return rawId;
    }

    const trimmed = rawId.trim();
    if (!/^\d+$/.test(trimmed)) {
        throw new NotifikasiServiceError(
            "INVALID_NOTIFIKASI_ID",
            "ID notifikasi harus berupa bilangan bulat positif",
            400
        );
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isNaN(parsed) || !Number.isSafeInteger(parsed) || parsed <= 0) {
        throw new NotifikasiServiceError(
            "INVALID_NOTIFIKASI_ID",
            "ID notifikasi harus berupa bilangan bulat positif",
            400
        );
    }

    return parsed;
}

export async function resolveNotifikasiAuthContext(
    clientOverride?: NotifikasiSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<{ idPelapor: number; role: Role; authUserId: string }> {
    if (authOverride !== undefined) {
        if (authOverride === null) {
            throw new NotifikasiServiceError(
                "UNAUTHORIZED",
                "Pengguna belum terautentikasi",
                401
            );
        }
        if (
            typeof authOverride.idPelapor !== "number" ||
            authOverride.idPelapor <= 0
        ) {
            throw new NotifikasiServiceError(
                "UNAUTHORIZED",
                "Profil pelapor tidak ditemukan pada sesi login",
                401
            );
        }
        return {
            authUserId: authOverride.authUserId,
            idPelapor: authOverride.idPelapor,
            role: authOverride.role,
        };
    }

    const supabase =
        clientOverride ??
        ((await createClient()) as unknown as NotifikasiSupabaseClient);

    if (!supabase.auth) {
        throw new NotifikasiServiceError(
            "UNAUTHORIZED",
            "Pengguna belum terautentikasi",
            401
        );
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        throw new NotifikasiServiceError(
            "UNAUTHORIZED",
            "Pengguna belum terautentikasi",
            401
        );
    }

    const rawIdPelapor =
        data.user.user_metadata?.id_pelapor ?? data.user.app_metadata?.id_pelapor;
    if (
        typeof rawIdPelapor !== "number" ||
        !Number.isInteger(rawIdPelapor) ||
        rawIdPelapor <= 0
    ) {
        throw new NotifikasiServiceError(
            "UNAUTHORIZED",
            "Profil pelapor tidak ditemukan pada sesi login",
            401
        );
    }

    const rawRole =
        (data.user.app_metadata?.role as string | undefined) ??
        (data.user.user_metadata?.role as string | undefined) ??
        "pelapor";
    const normalizedRole = rawRole.toLowerCase();
    const role: Role =
        normalizedRole === "admin" ||
        normalizedRole === "petugas" ||
        normalizedRole === "pelapor"
            ? normalizedRole
            : "pelapor";

    return {
        authUserId: data.user.id,
        idPelapor: rawIdPelapor,
        role,
    };
}

export async function createNotifikasi(
    idPelapor: number,
    pesan: string,
    clientOverride?: NotifikasiSupabaseClient
): Promise<Notifikasi> {
    let validIdPelapor: number;
    try {
        validIdPelapor = parseAndValidateIdPelapor(idPelapor);
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new NotifikasiServiceError(
                "INVALID_NOTIFIKASI_INPUT",
                "ID pelapor penerima notifikasi tidak valid",
                400
            );
        }
        throw error;
    }

    if (typeof pesan !== "string" || pesan.trim().length === 0) {
        throw new NotifikasiServiceError(
            "INVALID_NOTIFIKASI_INPUT",
            "Pesan notifikasi tidak boleh kosong",
            400
        );
    }

    return await insertNotifikasiRecord(
        validIdPelapor,
        pesan.trim(),
        null,
        clientOverride
    );
}

export async function sendNotifikasi(
    notifikasi: Notifikasi | null | undefined,
    clientOverride?: NotifikasiSupabaseClient
): Promise<boolean> {
    if (
        !notifikasi ||
        typeof notifikasi.idNotifikasi !== "number" ||
        notifikasi.idNotifikasi <= 0
    ) {
        return false;
    }

    notifikasi.statusNotifikasi = "Terkirim";

    if (clientOverride) {
        await updateStatusNotifikasiRecord(
            notifikasi.idNotifikasi,
            "Terkirim",
            undefined,
            clientOverride
        );
    }

    return true;
}

export async function getNotifikasiPelapor(
    idPelapor: number,
    clientOverride?: NotifikasiSupabaseClient
): Promise<Notifikasi[]> {
    let validIdPelapor: number;
    try {
        validIdPelapor = parseAndValidateIdPelapor(idPelapor);
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new NotifikasiServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    return await getNotifikasiByPelaporRecord(validIdPelapor, clientOverride);
}

export async function markNotifikasiAsRead(
    idNotifikasi: number,
    idPelapor: number,
    clientOverride?: NotifikasiSupabaseClient
): Promise<boolean> {
    const validIdNotifikasi = parseAndValidateIdNotifikasi(idNotifikasi);
    let validIdPelapor: number;
    try {
        validIdPelapor = parseAndValidateIdPelapor(idPelapor);
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new NotifikasiServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }

    const existing = await getNotifikasiByIdRecord(
        validIdNotifikasi,
        clientOverride
    );
    if (!existing) {
        throw new NotifikasiServiceError(
            "NOTIFIKASI_NOT_FOUND",
            `Notifikasi dengan ID ${validIdNotifikasi} tidak ditemukan`,
            404
        );
    }

    if (existing.idPelapor !== validIdPelapor) {
        throw new NotifikasiServiceError(
            "FORBIDDEN",
            "Anda tidak memiliki izin untuk mengakses atau mengubah notifikasi pengguna lain",
            403
        );
    }

    const updated = await updateStatusNotifikasiRecord(
        validIdNotifikasi,
        "Sudah Dibaca",
        new Date().toISOString(),
        clientOverride
    );

    return updated !== null;
}