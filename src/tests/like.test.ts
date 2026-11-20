import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { LikeSupabaseClient } from "@/repositories/likeRepository";
import {
    getLikedLaporanIdsByPelaporService,
    isLaporanLiked,
    LikeServiceError,
    likeLaporan,
    resolveAuthenticatedPelaporForLike,
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

    it("mencegah jumlah_like menjadi -1 saat unlike pada laporan dengan jumlah_like 0", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 21,
                    id_pelapor: 1,
                    judul_laporan: "Like Tidak Sinkron",
                    deskripsi: "Jumlah like 0 padahal ada record like",
                    lokasi: "Labtek V Lt 2",
                    foto_url: "https://example.com/air.jpg",
                    jumlah_like: 0,
                    status_laporan: "diproses",
                },
            ],
            likes: [
                {
                    id_like: 1,
                    id_laporan: 21,
                    id_pelapor: 2,
                },
            ],
        });
        const client = mock as unknown as LikeSupabaseClient;

        const unlikedZero = await unlikeLaporan(21, 2, client);
        assert.equal(unlikedZero.liked, false);
        assert.equal(unlikedZero.jumlahLike, 0);
    });

    it("mengambil daftar ID laporan yang di-like pelapor dan menolak ID tidak valid (400)", async () => {
        const mock = createMockSupabaseClient({
            likes: [
                { id_like: 1, id_laporan: 10, id_pelapor: 2 },
                { id_like: 2, id_laporan: 12, id_pelapor: 2 },
                { id_like: 3, id_laporan: 99, id_pelapor: 5 },
            ],
        });
        const client = mock as unknown as LikeSupabaseClient;

        const likedIds = await getLikedLaporanIdsByPelaporService(2, client);
        assert.deepEqual(likedIds, [10, 12]);

        const emptyIds = await getLikedLaporanIdsByPelaporService(3, client);
        assert.deepEqual(emptyIds, []);

        await assert.rejects(
            () => getLikedLaporanIdsByPelaporService(0, client),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "INVALID_PELAPOR_ID" &&
                err.statusCode === 400
        );
    });

    it("menolak laporan tidak ditemukan (404) serta ID laporan/pelapor negatif/nol (400)", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as LikeSupabaseClient;

        await assert.rejects(
            () => likeLaporan(999, 1, client),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "LAPORAN_NOT_FOUND" &&
                err.statusCode === 404
        );

        await assert.rejects(
            () => unlikeLaporan(999, 1, client),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "LAPORAN_NOT_FOUND" &&
                err.statusCode === 404
        );

        await assert.rejects(
            () => isLaporanLiked(0, 1, client),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "INVALID_LAPORAN_ID" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => likeLaporan(1, -5, client),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "INVALID_PELAPOR_ID" &&
                err.statusCode === 400
        );
    });

    it("resolveAuthenticatedPelaporForLike memvalidasi role pelapor, fallback email, dan menolak non-pelapor/unauthenticated", async () => {
        const mock = createMockSupabaseClient({
            pelapor: [
                {
                    id_pelapor: 7,
                    auth_user_id: null,
                    email: "13525001@mahasiswa.itb.ac.id",
                    nama_pelapor: "Mhs ITB",
                    nim_nip: "13525001",
                    poin: 0,
                },
            ],
        });
        const client = mock as unknown as LikeSupabaseClient;

        const direct = await resolveAuthenticatedPelaporForLike(client, {
            authUserId: "u-1",
            idPelapor: 2,
            role: "pelapor",
        });
        assert.equal(direct.idPelapor, 2);

        const viaEmail = await resolveAuthenticatedPelaporForLike(client, {
            authUserId: "u-7",
            idPelapor: null,
            email: "13525001@mahasiswa.itb.ac.id",
            role: "pelapor",
        });
        assert.equal(viaEmail.idPelapor, 7);

        await assert.rejects(
            () =>
                resolveAuthenticatedPelaporForLike(client, {
                    authUserId: "staff-1",
                    idPelapor: 3,
                    role: "petugas",
                }),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "FORBIDDEN" &&
                err.statusCode === 403
        );

        await assert.rejects(
            () => resolveAuthenticatedPelaporForLike(client, null),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "UNAUTHORIZED" &&
                err.statusCode === 401
        );

        await assert.rejects(
            () =>
                resolveAuthenticatedPelaporForLike(client, {
                    authUserId: "ghost",
                    idPelapor: null,
                    email: "tidakada@itb.ac.id",
                    role: "pelapor",
                }),
            (err: unknown) =>
                err instanceof LikeServiceError &&
                err.code === "INVALID_PELAPOR_SESSION" &&
                err.statusCode === 401
        );
    });
});

