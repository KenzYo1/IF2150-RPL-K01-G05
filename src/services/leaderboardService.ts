import {
    getAllPelapor,
    getDataPelapor,
    type PelaporSupabaseClient,
} from "@/repositories/pelaporRepository";
import {
    getMyPelaporProfileService,
    parseAndValidateIdPelapor,
    PelaporServiceError,
} from "@/services/pelaporService";
import type {
    LeaderboardEntry,
    MyLeaderboardData,
} from "@/types/leaderboard";
import type {
    AuthenticatedUserContext,
    PelaporEntity,
} from "@/types/pelapor";

export const MAX_LEADERBOARD_ENTRIES = 20;

export class LeaderboardServiceError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode: number) {
        super(message);
        this.name = "LeaderboardServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

export function comparePelaporByPoin(
    a: PelaporEntity,
    b: PelaporEntity
): number {
    if (b.poinPelapor !== a.poinPelapor) {
        return b.poinPelapor - a.poinPelapor;
    }
    return a.idPelapor - b.idPelapor;
}

export function toLeaderboardEntry(
    pelapor: PelaporEntity,
    rank: number
): LeaderboardEntry {
    return {
        rank,
        idPelapor: pelapor.idPelapor,
        namaPelapor: pelapor.namaPelapor,
        poinPelapor: pelapor.poinPelapor,
    };
}

export async function getPelaporPoin(
    idPelapor: number,
    clientOverride?: PelaporSupabaseClient
): Promise<number> {
    const validId = parseAndValidateIdPelapor(idPelapor);
    const pelapor = await getDataPelapor(validId, clientOverride);

    if (!pelapor) {
        return 0;
    }

    return pelapor.poinPelapor;
}

export async function sortPelaporByPoin(
    clientOverride?: PelaporSupabaseClient
): Promise<PelaporEntity[]> {
    const daftarPelapor = await getAllPelapor(clientOverride);
    const salinan = [...daftarPelapor];
    salinan.sort(comparePelaporByPoin);
    return salinan;
}

export async function getPelaporRank(
    idPelapor: number,
    clientOverride?: PelaporSupabaseClient
): Promise<number> {
    const validId = parseAndValidateIdPelapor(idPelapor);
    const daftarTerurut = await sortPelaporByPoin(clientOverride);

    for (let index = 0; index < daftarTerurut.length; index += 1) {
        if (daftarTerurut[index].idPelapor === validId) {
            return index + 1;
        }
    }

    return 0;
}

export async function getTop20Pelapor(
    clientOverride?: PelaporSupabaseClient
): Promise<LeaderboardEntry[]> {
    const daftarTerurut = await sortPelaporByPoin(clientOverride);
    const top20 = daftarTerurut.slice(0, MAX_LEADERBOARD_ENTRIES);

    return top20.map((pelapor, index) => toLeaderboardEntry(pelapor, index + 1));
}

export async function getMyLeaderboardService(
    clientOverride?: PelaporSupabaseClient,
    authOverride?: AuthenticatedUserContext | null
): Promise<MyLeaderboardData> {
    try {
        const profil = await getMyPelaporProfileService(
            clientOverride,
            authOverride
        );
        const rank = await getPelaporRank(profil.idPelapor, clientOverride);

        return {
            idPelapor: profil.idPelapor,
            namaPelapor: profil.namaPelapor,
            poinPelapor: profil.poinPelapor,
            rank,
            inTop20: rank > 0 && rank <= MAX_LEADERBOARD_ENTRIES,
        };
    } catch (error) {
        if (error instanceof PelaporServiceError) {
            throw new LeaderboardServiceError(
                error.code,
                error.message,
                error.statusCode
            );
        }
        throw error;
    }
}