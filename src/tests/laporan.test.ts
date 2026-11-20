import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MAX_FOTO_SIZE_BYTES } from "@/lib/supabase/storage";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    createLaporanService,
    getLaporanByIdService,
    getValidLaporanService,
    isJenisFotoValid,
    isJumlahKarakterValid,
    isLaporanValid,
    isUkuranFotoValid,
    LaporanServiceError,
    listLaporanService,
    MAX_DESKRIPSI_CHARS,
    MAX_JUDUL_CHARS,
    parseAndValidateIdLaporan,
    setStatusLaporanService,
    uploadFotoLaporanService,
    validateFotoLaporanInput,
} from "@/services/laporanService";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Laporan (UC01 & Validasi Input)", () => {
    it("memvalidasi jumlah karakter deskripsi (1..300 karakter)", () => {
        assert.equal(isJumlahKarakterValid("Keran bocor di lantai 2"), true);
        assert.equal(isJumlahKarakterValid("   "), false);
        assert.equal(
            isJumlahKarakterValid("a".repeat(MAX_DESKRIPSI_CHARS)),
            true
        );
        assert.equal(
            isJumlahKarakterValid("a".repeat(MAX_DESKRIPSI_CHARS + 1)),
            false
        );
    });

    it("memvalidasi ukuran foto (<= 10 MB) dan tipe MIME (JPEG/PNG)", () => {
        assert.equal(isUkuranFotoValid(1024), true);
        assert.equal(isUkuranFotoValid(MAX_FOTO_SIZE_BYTES), true);
        assert.equal(isUkuranFotoValid(0), false);
        assert.equal(isUkuranFotoValid(MAX_FOTO_SIZE_BYTES + 1), false);

        assert.equal(isJenisFotoValid("image/jpeg", "bukti.jpg"), true);
        assert.equal(isJenisFotoValid("image/png", "bukti.png"), true);
        assert.equal(isJenisFotoValid("application/pdf", "dokumen.pdf"), false);
    });

    it("isLaporanValid menggabungkan validasi deskripsi dan foto", () => {
        assert.equal(
            isLaporanValid("Air keruh", {
                size: 500_000,
                mimeType: "image/jpeg",
                fileName: "air.jpg",
            }),
            true
        );
        assert.equal(isLaporanValid("Air keruh", null), false);
    });

    it("berhasil membuat laporan baru beserta upload foto dan memfilter laporan ditolak", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 1,
                    id_pelapor: 1,
                    judul_laporan: "Laporan Ditolak",
                    deskripsi: "Contoh spam",
                    lokasi: "Labtek V Lt 1",
                    foto_url: "https://example.com/1.jpg",
                    jumlah_like: 0,
                    status_laporan: "ditolak",
                    status_moderasi: "tidak valid",
                },
            ],
        });

        const client = mock as unknown as LaporanSupabaseClient;
        const created = await createLaporanService(
            {
                idPelapor: 1,
                judulLaporan: "Wastafel Bocor",
                descLaporan: "Keran wastafel di toilet lantai 2 menetes terus",
                lokasi: "Labtek V Lt 2",
                fotoFile: {
                    buffer: new Uint8Array([1, 2, 3, 4]),
                    fileName: "wastafel.jpg",
                    mimeType: "image/jpeg",
                    size: 4,
                },
            },
            client,
            { authUserId: "user-1", idPelapor: 1, role: "pelapor" }
        );

        assert.equal(created.judulLaporan, "Wastafel Bocor");
        assert.equal(created.idPelapor, 1);
        assert.ok(created.fotoLaporan?.includes("laporan-foto"));

        const all = await listLaporanService(client);
        assert.equal(all.length, 2);

        const validOnly = await getValidLaporanService(client);
        assert.equal(validOnly.length, 1);
        assert.equal(validOnly[0].judulLaporan, "Wastafel Bocor");
    });

    it("menolak pembuatan laporan jika deskripsi kosong", async () => {
        const mock = createMockSupabaseClient();
        await assert.rejects(
            () =>
                createLaporanService(
                    {
                        idPelapor: 1,
                        judulLaporan: "Judul",
                        descLaporan: "   ",
                        lokasi: "Labtek V Lt 1",
                        fotoLaporan: "https://example.com/foto.jpg",
                    },
                    mock as unknown as LaporanSupabaseClient,
                    { authUserId: "user-1", idPelapor: 1, role: "pelapor" }
                ),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "INVALID_LAPORAN_DESKRIPSI"
        );
    });

    it("parseAndValidateIdLaporan menerima bilangan bulat positif/string angka dan menolak ID invalid", () => {
        assert.equal(parseAndValidateIdLaporan(1), 1);
        assert.equal(parseAndValidateIdLaporan(" 42 "), 42);

        for (const badId of [0, -1, 1.5, "abc", "   "]) {
            assert.throws(
                () => parseAndValidateIdLaporan(badId),
                (err: unknown) =>
                    err instanceof LaporanServiceError &&
                    err.code === "INVALID_LAPORAN_ID" &&
                    err.statusCode === 400
            );
        }
    });

    it("isJenisFotoValid dan validateFotoLaporanInput menangani variasi ekstensi/MIME dan menolak file tidak valid", async () => {
        assert.equal(isJenisFotoValid("", "bukti.png"), true);
        assert.equal(isJenisFotoValid("image/png", "tanpa_ekstensi"), true);
        assert.equal(isJenisFotoValid("image/jpeg", "palsu.gif"), false);

        assert.throws(
            () =>
                validateFotoLaporanInput({
                    buffer: new Uint8Array(),
                    fileName: "kosong.jpg",
                    mimeType: "image/jpeg",
                    size: 0,
                }),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "EMPTY_FOTO_FILE" &&
                err.statusCode === 400
        );

        assert.throws(
            () =>
                validateFotoLaporanInput({
                    buffer: new Uint8Array([1, 2]),
                    fileName: "dok.pdf",
                    mimeType: "application/pdf",
                    size: 2,
                }),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "INVALID_FOTO_TYPE" &&
                err.statusCode === 400
        );

        assert.throws(
            () =>
                validateFotoLaporanInput({
                    buffer: new Uint8Array([1, 2]),
                    fileName: "besar.jpg",
                    mimeType: "image/jpeg",
                    size: MAX_FOTO_SIZE_BYTES + 1,
                }),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "FOTO_TOO_LARGE" &&
                err.statusCode === 400
        );

        const mock = createMockSupabaseClient();
        const uploaded = await uploadFotoLaporanService(
            {
                buffer: new Uint8Array([1, 2, 3]),
                fileName: "bukti.png",
                mimeType: "image/png",
                size: 3,
            },
            { idPelapor: 5 },
            mock as unknown as LaporanSupabaseClient
        );
        assert.equal(uploaded.bucket, "laporan-foto");
        assert.ok(uploaded.publicUrl.includes("pelapor-5"));
    });

    it("createLaporanService menolak deskripsi/judul terlalu panjang, tanpa foto, dan bisa resolve idPelapor dari auth", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as LaporanSupabaseClient;
        const auth = { authUserId: "user-2", idPelapor: 2, role: "pelapor" as const };

        await assert.rejects(
            () =>
                createLaporanService(
                    {
                        idPelapor: 2,
                        judulLaporan: "Judul",
                        descLaporan: "a".repeat(MAX_DESKRIPSI_CHARS + 1),
                        fotoLaporan: "https://example.com/foto.jpg",
                    },
                    client,
                    auth
                ),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "DESKRIPSI_TOO_LONG"
        );

        await assert.rejects(
            () =>
                createLaporanService(
                    {
                        idPelapor: 2,
                        judulLaporan: "j".repeat(MAX_JUDUL_CHARS + 1),
                        descLaporan: "Keran bocor",
                        fotoLaporan: "https://example.com/foto.jpg",
                    },
                    client,
                    auth
                ),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "JUDUL_TOO_LONG"
        );

        await assert.rejects(
            () =>
                createLaporanService(
                    {
                        idPelapor: 2,
                        judulLaporan: "Judul",
                        descLaporan: "Keran bocor",
                    },
                    client,
                    auth
                ),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "MISSING_FOTO_LAPORAN"
        );

        const resolved = await createLaporanService(
            {
                judulLaporan: "Saluran Mampet",
                descLaporan: "Di depan labtek",
                lokasi: "Labtek V Lt 1",
                fotoLaporan: "https://example.com/mampet.jpg",
            },
            client,
            auth
        );
        assert.equal(resolved.idPelapor, 2);
    });

    it("getLaporanByIdService dan setStatusLaporanService menangani kasus normal, status kosong (400), dan 404", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 10,
                    id_pelapor: 1,
                    judul_laporan: "Pipa Bocor",
                    deskripsi: "Bocor di lantai 3",
                    lokasi: "Labtek V Lt 3",
                    foto_url: "https://example.com/pipa.jpg",
                    jumlah_like: 2,
                    status_laporan: "diproses",
                },
            ],
        });
        const client = mock as unknown as LaporanSupabaseClient;

        const found = await getLaporanByIdService("10", client);
        assert.equal(found.idLaporan, 10);
        assert.equal(found.judulLaporan, "Pipa Bocor");

        await assert.rejects(
            () => getLaporanByIdService(999, client),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "LAPORAN_NOT_FOUND" &&
                err.statusCode === 404
        );

        const updated = await setStatusLaporanService(10, "  tuntas  ", client);
        assert.equal(updated, true);
        assert.equal(mock.state.laporan[0].status_laporan, "tuntas");

        await assert.rejects(
            () => setStatusLaporanService(10, "   ", client),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "INVALID_STATUS_LAPORAN" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => setStatusLaporanService(999, "tuntas", client),
            (err: unknown) =>
                err instanceof LaporanServiceError &&
                err.code === "LAPORAN_NOT_FOUND" &&
                err.statusCode === 404
        );
    });
});
