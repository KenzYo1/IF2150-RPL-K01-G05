import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getMyLeaderboardService,
    getPelaporPoin,
    getPelaporRank,
    getTop20Pelapor,
    LeaderboardServiceError,
    sortPelaporByPoin,
} from "@/services/leaderboardService";
import { PelaporServiceError } from "@/services/pelaporService";
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

        const myBoundary20 = await getMyLeaderboardService(client, {
            authUserId: "auth-6",
            idPelapor: 6,
            role: "pelapor",
        });
        assert.equal(myBoundary20.rank, 20);
        assert.equal(myBoundary20.inTop20, true);

        const myBoundary21 = await getMyLeaderboardService(client, {
            authUserId: "auth-5",
            idPelapor: 5,
            role: "pelapor",
        });
        assert.equal(myBoundary21.rank, 21);
        assert.equal(myBoundary21.inTop20, false);
    });

    it("menangani data pelapor kosong dan tie-breaker poin sama berdasarkan idPelapor terkecil", async () => {
        const emptyMock = createMockSupabaseClient({ pelapor: [] });
        const emptyClient = emptyMock as unknown as PelaporSupabaseClient;

        assert.deepEqual(await sortPelaporByPoin(emptyClient), []);
        assert.deepEqual(await getTop20Pelapor(emptyClient), []);
        assert.equal(await getPelaporPoin(1, emptyClient), 0);
        assert.equal(await getPelaporRank(1, emptyClient), 0);

        const tieMock = createMockSupabaseClient({
            pelapor: [
                { id_pelapor: 5, nama_pelapor: "Eko", poin: 50 },
                { id_pelapor: 8, nama_pelapor: "Hadi", poin: 80 },
                { id_pelapor: 2, nama_pelapor: "Budi", poin: 50 },
            ],
        });
        const tieClient = tieMock as unknown as PelaporSupabaseClient;

        const sorted = await sortPelaporByPoin(tieClient);
        assert.deepEqual(
            sorted.map((p) => p.idPelapor),
            [8, 2, 5]
        );
        assert.equal(await getPelaporRank(2, tieClient), 2);
        assert.equal(await getPelaporRank(5, tieClient), 3);
    });

    it("menolak ID pelapor invalid (400) dan sesi belum login pada getMyLeaderboardService (401)", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as PelaporSupabaseClient;

        await assert.rejects(
            () => getPelaporPoin(0, client),
            (err: unknown) =>
                err instanceof PelaporServiceError &&
                err.code === "INVALID_PELAPOR_ID" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => getPelaporRank(-1, client),
            (err: unknown) =>
                err instanceof PelaporServiceError &&
                err.code === "INVALID_PELAPOR_ID" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => getMyLeaderboardService(client, null),
            (err: unknown) =>
                err instanceof LeaderboardServiceError &&
                err.code === "UNAUTHORIZED" &&
                err.statusCode === 401
        );
    });
});

