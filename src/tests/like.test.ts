import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { LikeSupabaseClient } from "@/repositories/likeRepository";
import {
    isLaporanLiked,
    LikeServiceError,
    likeLaporan,
    unlikeLaporan,
} from "@/services/likeService";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Like & Unlike (UC03)", () => {
    it("berhasil memberikan like, mencegah duplicate like (409), dan membatalkan like", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 10,
                    id_pelapor: 1,
                    judul_laporan: "Air Keruh",
                    deskripsi: "Air keruh di GKU",
                    lokasi: "Labtek V Lt 1",
                    foto_url: "https://example.com/air.jpg",
                    jumlah_like: 3,
                    status_laporan: "diproses",
                },
            ],
        });

        const client = mock as unknown as LikeSupabaseClient;

        assert.equal(await isLaporanLiked(10, 2, client), false);

        const liked = await likeLaporan(10, 2, client);
        assert.equal(liked.liked, true);
        assert.equal(liked.jumlahLike, 4);
        assert.equal(await isLaporanLiked(10, 2, client), true);

        await assert.rejects(
            () => likeLaporan(10, 2, client),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "DUPLICATE_LIKE" &&
                err.statusCode === 409
        );

        const unliked = await unlikeLaporan(10, 2, client);
        assert.equal(unliked.liked, false);
        assert.equal(unliked.jumlahLike, 3);
        assert.equal(await isLaporanLiked(10, 2, client), false);
    });

    it("mengembalikan 404 LIKE_NOT_FOUND saat membatalkan like yang belum diberikan", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 10,
                    id_pelapor: 1,
                    judul_laporan: "Air Keruh",
                    deskripsi: "Air keruh di GKU",
                    lokasi: "Labtek V Lt 1",
                    foto_url: "https://example.com/air.jpg",
                    jumlah_like: 0,
                    status_laporan: "diproses",
                },
            ],
        });

        await assert.rejects(
            () =>
                unlikeLaporan(
                    10,
                    2,
                    mock as unknown as LikeSupabaseClient
                ),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "LIKE_NOT_FOUND" &&
                err.statusCode === 404
        );
    });
});

