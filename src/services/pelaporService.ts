import { createClient } from "@/lib/supabase/server";
import {
    getDataPelapor,
    getDataPelaporByAuthUserId,
    getDataPelaporByEmail,
    type PelaporSupabaseClient,
} from "@/repositories/pelaporRepository";
import type {
    AuthenticatedUserContext,
    PelaporEntity,
    PublicPelaporData,
} from "@/types/pelapor";
import type { Role } from "@/types/role";

export class PelaporServiceError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode: number) {
        super(message);
        this.name = "PelaporServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

export function parseAndValidateIdPelapor(rawId: string | number): number {
    if (typeof rawId === "number") {
        if (!Number.isInteger(rawId) || rawId <= 0) {
            throw new PelaporServiceError(
                "INVALID_PELAPOR_ID",
                "ID pelapor harus berupa bilangan bulat positif",
                400
            );
        }
        return rawId;
    }

    const trimmed = rawId.trim();
    if (!/^\d+$/.test(trimmed)) {
        throw new PelaporServiceError(
            "INVALID_PELAPOR_ID",
            "ID pelapor harus berupa bilangan bulat positif",
            400
        );
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isNaN(parsed) || !Number.isSafeInteger(parsed) || parsed <= 0) {
        throw new PelaporServiceError(
            "INVALID_PELAPOR_ID",
            "ID pelapor harus berupa bilangan bulat positif",
            400
        );
    }

    return parsed;
}

export function toPublicPelaporData(pelapor: PelaporEntity): PublicPelaporData {
    return {
        idPelapor: pelapor.idPelapor,
        namaPelapor: pelapor.namaPelapor,
        poinPelapor: pelapor.poinPelapor,
    };
}

export async function resolvePelaporAuthContext(
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<AuthenticatedUserContext> {
    if (authOverride !== undefined) {
        if (authOverride === null) {
            throw new PelaporServiceError(
                "UNAUTHORIZED",
                "Pengguna belum terautentikasi",
                401
            );
        }
        return authOverride;
    }

    const supabase =
        clientOverride ?? ((await createClient()) as unknown as PelaporSupabaseClient);

    if (!supabase.auth) {
        throw new PelaporServiceError(
            "UNAUTHORIZED",
            "Pengguna belum terautentikasi",
            401
        );
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        throw new PelaporServiceError(
            "UNAUTHORIZED",
            "Pengguna belum terautentikasi",
            401
        );
    }

    const emailLower = (data.user.email ?? "").trim().toLowerCase();
    const fallbackRoleByEmail = emailLower.endsWith("@staff.itb.ac.id")
        ? "petugas"
        : "pelapor";

    const rawRole =
        (data.user.app_metadata?.role as string | undefined) ??
        (data.user.user_metadata?.role as string | undefined) ??
        fallbackRoleByEmail;

    const normalizedRole = rawRole.toLowerCase();
    const role: Role =
        normalizedRole === "admin" ||
        normalizedRole === "petugas" ||
        normalizedRole === "pelapor"
            ? normalizedRole
            : "pelapor";

    const rawIdPelapor =
        data.user.user_metadata?.id_pelapor ?? data.user.app_metadata?.id_pelapor;
    const idPelapor =
        typeof rawIdPelapor === "number" && Number.isInteger(rawIdPelapor)
            ? rawIdPelapor
            : null;

    return {
        authUserId: data.user.id,
        idPelapor,
        email: data.user.email ?? null,
        role,
    };
}

export async function getMyPelaporProfileService(
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<PelaporEntity> {
    const user = await resolvePelaporAuthContext(clientOverride, authOverride);

    let pelapor: PelaporEntity | null = null;

    if (typeof user.idPelapor === "number" && user.idPelapor > 0) {
        pelapor = await getDataPelapor(user.idPelapor, clientOverride);
    }
    if (!pelapor && user.authUserId) {
        pelapor = await getDataPelaporByAuthUserId(user.authUserId, clientOverride);
    }
    if (!pelapor && user.email) {
        pelapor = await getDataPelaporByEmail(user.email, clientOverride);
    }

    if (!pelapor) {
        throw new PelaporServiceError(
            "PELAPOR_NOT_FOUND",
            "Profil pelapor untuk akun ini tidak ditemukan",
            404
        );
    }

    return pelapor;
}

export async function getPelaporByIdService(
    rawIdPelapor: string | number,
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<PelaporEntity | PublicPelaporData> {
    const user = await resolvePelaporAuthContext(clientOverride, authOverride);
    const idPelapor = parseAndValidateIdPelapor(rawIdPelapor);

    const pelapor = await getDataPelapor(idPelapor, clientOverride);
    if (!pelapor) {
        throw new PelaporServiceError(
            "PELAPOR_NOT_FOUND",
            `Pelapor dengan ID ${idPelapor} tidak ditemukan`,
            404
        );
    }

    const isOwner =
        (user.idPelapor !== undefined &&
            user.idPelapor !== null &&
            user.idPelapor === pelapor.idPelapor) ||
        (pelapor.authUserId !== null && pelapor.authUserId === user.authUserId);

    if (isOwner || user.role === "admin") {
        return pelapor;
    }

    return toPublicPelaporData(pelapor);
}