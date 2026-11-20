import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    addPoinPelapor,
    isStatusRejected,
    isStatusValidForPoin,
    sendTanggapan,
    setStatusLaporan,
    TanggapanServiceError,
} from "@/services/tanggapanService";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Tanggapan & Poin (UC02 & UC04)", () => {
    it("isStatusValidForPoin dan isStatusRejected menangani huruf campur, spasi berlebih, null, dan undefined", () => {
        assert.equal(isStatusValidForPoin("  VaLiD  "), true);
        assert.equal(isStatusValidForPoin("dalam penanganan"), true);
        assert.equal(isStatusValidForPoin("SELESAI"), true);
        assert.equal(isStatusValidForPoin("menunggu"), false);
        assert.equal(isStatusValidForPoin("   "), false);
        assert.equal(isStatusValidForPoin(null), false);

        assert.equal(isStatusRejected("  DiToLaK  "), true);
        assert.equal(isStatusRejected("INVALID"), true);
        assert.equal(isStatusRejected("valid"), false);
        assert.equal(isStatusRejected(undefined), false);
    });

    it("addPoinPelapor menormalkan poin korup negatif di DB, menerima ID string, dan menolak poin/ID aneh", async () => {
        const mock = createMockSupabaseClient({
            pelapor: [
                {
                    id_pelapor: 1,
                    auth_user_id: "user-1",
                    nama_pelapor: "Budi Santoso",
                    nim_nip: "13524001",
                    poin: -10, // kasus aneh: data korup bernilai negatif di DB
                },
            ],
        });

        // Math.max(0, -10) -> 0, lalu +5 => 5
        const recovered = await addPoinPelapor("1", 5, mock as never);
        assert.equal(recovered.poinLama, 0);
        assert.equal(recovered.poinDitambahkan, 5);
        assert.equal(recovered.poinBaru, 5);

        // Batas terkecil: +1 poin
        const boundary = await addPoinPelapor(1, 1, mock as never);
        assert.equal(boundary.poinBaru, 6);

        // Kasus aneh: poin 0, desimal 1.5, negatif -3, dan NaN
        for (const badPoin of [0, 1.5, -3, Number.NaN]) {
            await assert.rejects(
                () => addPoinPelapor(1, badPoin, mock as never),
                (err: unknown) =>
                    err instanceof TanggapanServiceError &&
                    err.code === "INVALID_POIN_VALUE" &&
                    err.statusCode === 400
            );
        }

        // ID pelapor bukan angka
        await assert.rejects(
            () => addPoinPelapor("abc", 1, mock as never),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "INVALID_PELAPOR_ID" &&
                err.statusCode === 400
        );

        // Pelapor tidak ada di database
        await assert.rejects(
            () => addPoinPelapor(999, 1, mock as never),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "PELAPOR_NOT_FOUND" &&
                err.statusCode === 404
        );
    });

    it("setStatusLaporan men-trim status, mengembalikan false jika ID tidak ada, dan menolak input invalid", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 5,
                    id_pelapor: 1,
                    judul_laporan: "Keran Rusak",
                    deskripsi: "Keran patah di Labtek V",
                    lokasi: "Labtek V Lt 2",
                    foto_url: "https://example.com/foto.jpg",
                    jumlah_like: 0,
                    status_laporan: "Unverified",
                },
            ],
        });
        const client = mock as unknown as LaporanSupabaseClient;

        const updated = await setStatusLaporan(
            "5",
            "  dalam penanganan  ",
            { catatan: "Teknisi otw" },
            client
        );
        assert.equal(updated, true);
        assert.equal(mock.state.laporan[0].status_laporan, "dalam penanganan");

        const notFound = await setStatusLaporan(999, "valid", undefined, client);
        assert.equal(notFound, false);

        await assert.rejects(
            () => setStatusLaporan(0, "valid", undefined, client),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "INVALID_LAPORAN_ID" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => setStatusLaporan(5, "    ", undefined, client),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "INVALID_STATUS_LAPORAN" &&
                err.statusCode === 400
        );
    });

    it("memberikan +1 poin dan mengirim notifikasi saat laporan divalidasi oleh Petugas", async () => {
        const mock = createMockSupabaseClient({
            pelapor: [
                {
                    id_pelapor: 1,
                    auth_user_id: "user-1",
                    nama_pelapor: "Budi Santoso",
                    nim_nip: "13524001",
                    poin: 10,
                },
            ],
            laporan: [
                {
                    id_laporan: 5,
                    id_pelapor: 1,
                    judul_laporan: "Keran Rusak",
                    deskripsi: "Keran patah di Labtek V",
                    lokasi: "Labtek V Lt 2",
                    foto_url: "https://example.com/foto.jpg",
                    jumlah_like: 0,
                    status_laporan: "Unverified",
                    points_awarded: false,
                },
            ],
        });

        const client = mock as unknown as LaporanSupabaseClient;
        const result = await sendTanggapan(
            5,
            {
                statusLaporan: "valid",
                catatan: "Petugas sedang menuju lokasi",
            },
            client,
            { authUserId: "staff-1", idPelapor: 3, role: "petugas" }
        );

        assert.equal(result.laporan.statusLaporan, "valid");
        assert.equal(result.pointsAwardedNow, true);
        assert.equal(result.poinDitambahkan, 1);
        assert.equal(result.poinPelaporBaru, 11);
        assert.equal(result.notifikasiSent, true);
        assert.ok(result.notifikasi !== null);
        assert.equal(mock.state.pelapor[0].poin, 11);
        assert.equal(mock.state.notifikasi.length, 1);
    });

    it("tidak memberikan poin ganda jika laporan sudah pernah divalidasi sebelumnya", async () => {
        const mock = createMockSupabaseClient({
            pelapor: [
                {
                    id_pelapor: 1,
                    auth_user_id: "user-1",
                    nama_pelapor: "Budi Santoso",
                    nim_nip: "13524001",
                    poin: 11,
                },
            ],
            laporan: [
                {
                    id_laporan: 5,
                    id_pelapor: 1,
                    judul_laporan: "Keran Rusak",
                    deskripsi: "Keran patah di Labtek V",
                    lokasi: "Labtek V Lt 2",
                    foto_url: "https://example.com/foto.jpg",
                    jumlah_like: 0,
                    status_laporan: "valid",
                    points_awarded: true,
                },
            ],
        });

        const result = await sendTanggapan(
            5,
            {
                statusLaporan: "selesai",
                catatan: "Sudah selesai diperbaiki",
            },
            mock as unknown as LaporanSupabaseClient,
            { authUserId: "staff-1", idPelapor: 3, role: "petugas" }
        );

        assert.equal(result.laporan.statusLaporan, "selesai");
        assert.equal(result.pointsAwardedNow, false);
        assert.equal(result.poinDitambahkan, 0);
        assert.equal(mock.state.pelapor[0].poin, 11);
    });

    it("sendTanggapan oleh Admin pada laporan tanpa judul (null) yang ditolak tetap mengirim notif fallback #ID tanpa poin", async () => {
        const mock = createMockSupabaseClient({
            pelapor: [
                {
                    id_pelapor: 1,
                    auth_user_id: "user-1",
                    nama_pelapor: "Budi Santoso",
                    nim_nip: "13524001",
                    poin: 10,
                },
            ],
            laporan: [
                {
                    id_laporan: 7,
                    id_pelapor: 1,
                    judul_laporan: null,
                    deskripsi: "Foto buram",
                    lokasi: "Labtek V Lt 1",
                    foto_url: "https://example.com/foto.jpg",
                    jumlah_like: 0,
                    status_laporan: "Unverified",
                    points_awarded: false,
                },
            ],
        });

        const result = await sendTanggapan(
            7,
            {
                statusLaporan: "ditolak",
                catatan: "Foto tidak jelas",
            },
            mock as unknown as LaporanSupabaseClient,
            { authUserId: "admin-1", idPelapor: 2, role: "admin" }
        );

        assert.equal(result.laporan.statusLaporan, "ditolak");
        assert.equal(result.pointsAwardedNow, false);
        assert.equal(result.poinDitambahkan, 0);
        assert.equal(mock.state.pelapor[0].poin, 10);
        assert.equal(result.notifikasiSent, true);
        assert.ok(result.notifikasi?.pesan.includes("#7"));
        assert.ok(result.notifikasi?.pesan.includes("tidak dapat diproses"));
    });

    it("sendTanggapan menerima input string langsung dan aman pada laporan yatim (id_pelapor: null)", async () => {
        const mock = createMockSupabaseClient({
            laporan: [
                {
                    id_laporan: 8,
                    id_pelapor: null,
                    judul_laporan: "Pipa Bocor",
                    deskripsi: "Di dekat kantin",
                    lokasi: "Labtek V Lt 1",
                    foto_url: "https://example.com/foto.jpg",
                    jumlah_like: 0,
                    status_laporan: "Unverified",
                    points_awarded: false,
                },
            ],
        });

        const result = await sendTanggapan(
            8,
            "selesai",
            mock as unknown as LaporanSupabaseClient,
            { authUserId: "staff-1", idPelapor: 3, role: "petugas" }
        );

        assert.equal(result.laporan.statusLaporan, "selesai");
        assert.equal(result.pointsAwardedNow, false);
        assert.equal(result.poinDitambahkan, 0);
        assert.equal(result.notifikasiSent, false);
        assert.equal(result.notifikasi, null);
    });

    it("sendTanggapan menolak role pelapor (403), ID negatif (400), status kosong (400), dan laporan 404", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as LaporanSupabaseClient;
        const petugasAuth = {
            authUserId: "staff-1",
            idPelapor: 3,
            role: "petugas" as const,
        };

        await assert.rejects(
            () =>
                sendTanggapan(
                    1,
                    { statusLaporan: "valid" },
                    client,
                    { authUserId: "user-1", idPelapor: 1, role: "pelapor" }
                ),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "FORBIDDEN" &&
                err.statusCode === 403
        );

        await assert.rejects(
            () => sendTanggapan(-1, "valid", client, petugasAuth),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "INVALID_LAPORAN_ID" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => sendTanggapan(1, { statusLaporan: "   " }, client, petugasAuth),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "INVALID_STATUS_LAPORAN" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => sendTanggapan(999, "valid", client, petugasAuth),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "LAPORAN_NOT_FOUND" &&
                err.statusCode === 404
        );
    });
});
