import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getMyLeaderboardService,
    getPelaporPoin,
    getPelaporRank,
    getTop20Pelapor,
} from "@/services/leaderboardService";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Leaderboard (UC05)", () => {
    const samplePelapor = Array.from({ length: 25 }, (_, i) => ({
        id_pelapor: i + 1,
        auth_user_id: `auth-${i + 1}`,
        nama_pelapor: `Pelapor ${i + 1}`,
        nim_nip: `135240${String(i + 1).padStart(2, "0")}`,
        poin: (i + 1) * 5,
    }));

    it("mengurutkan pelapor berdasarkan poin tertinggi dan membatasi Top 20", async () => {
        const mock = createMockSupabaseClient({ pelapor: samplePelapor });
        const client = mock as unknown as PelaporSupabaseClient;

        const top20 = await getTop20Pelapor(client);
        assert.equal(top20.length, 20);
        assert.equal(top20[0].rank, 1);
        assert.equal(top20[0].idPelapor, 25);
        assert.equal(top20[0].poinPelapor, 125);
        assert.equal(top20[19].rank, 20);
        assert.equal(top20[19].idPelapor, 6);
    });

    it("menghitung peringkat dan status inTop20 milik pengguna saat ini", async () => {
        const mock = createMockSupabaseClient({ pelapor: samplePelapor });
        const client = mock as unknown as PelaporSupabaseClient;

        const poinPelapor1 = await getPelaporPoin(1, client);
        const rankPelapor1 = await getPelaporRank(1, client);
        assert.equal(poinPelapor1, 5);
        assert.equal(rankPelapor1, 25);

        const myOutsideTop20 = await getMyLeaderboardService(client, {
            authUserId: "auth-1",
            idPelapor: 1,
            role: "pelapor",
        });
        assert.equal(myOutsideTop20.rank, 25);
        assert.equal(myOutsideTop20.inTop20, false);

        const myInsideTop20 = await getMyLeaderboardService(client, {
            authUserId: "auth-25",
            idPelapor: 25,
            role: "pelapor",
        });
        assert.equal(myInsideTop20.rank, 1);
        assert.equal(myInsideTop20.inTop20, true);
    });
});

