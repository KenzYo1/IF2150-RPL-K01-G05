import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { LaporanSupabaseClient } from "@/repositories/laporanRepository";
import {
    addPoinPelapor,
    sendTanggapan,
    TanggapanServiceError,
} from "@/services/tanggapanService";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Tanggapan & Poin (UC02 & UC04)", () => {
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

    it("menolak pemberian tanggapan oleh pengguna dengan role pelapor (403 FORBIDDEN)", async () => {
        const mock = createMockSupabaseClient();
        await assert.rejects(
            () =>
                sendTanggapan(
                    1,
                    { statusLaporan: "valid" },
                    mock as unknown as LaporanSupabaseClient,
                    { authUserId: "user-1", idPelapor: 1, role: "pelapor" }
                ),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "FORBIDDEN" &&
                err.statusCode === 403
        );
    });

    it("addPoinPelapor menolak nilai poin tidak positif", async () => {
        const mock = createMockSupabaseClient();
        await assert.rejects(
            () => addPoinPelapor(1, 0, mock as never),
            (err: unknown) =>
                err instanceof TanggapanServiceError &&
                err.code === "INVALID_POIN_VALUE"
        );
    });
});
