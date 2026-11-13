import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MAX_FOTO_SIZE_BYTES } from "@/lib/supabase/storage";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    createLaporanService,
    getValidLaporanService,
    isJenisFotoValid,
    isJumlahKarakterValid,
    isLaporanValid,
    isUkuranFotoValid,
    LaporanServiceError,
    listLaporanService,
    MAX_DESKRIPSI_CHARS,
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
                    status_moderasi: "ditolak",
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
});
