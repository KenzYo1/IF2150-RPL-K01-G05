import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { NotifikasiSupabaseClient } from "@/repositories/notifikasiRepository";
import {
    createNotifikasi,
    getNotifikasiPelapor,
    markNotifikasiAsRead,
    NotifikasiServiceError,
    sendNotifikasi,
} from "@/services/notifikasiService";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Notifikasi", () => {
    it("membuat notifikasi, mengambil daftar milik pelapor, dan menandai sudah dibaca", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as NotifikasiSupabaseClient;

        const created = await createNotifikasi(
            1,
            "Laporan Anda telah diverifikasi!",
            client
        );
        assert.equal(created.idPelapor, 1);
        assert.equal(created.statusNotifikasi, "Belum Dibaca");

        const list = await getNotifikasiPelapor(1, client);
        assert.equal(list.length, 1);
        assert.equal(list[0].pesan, "Laporan Anda telah diverifikasi!");

        const marked = await markNotifikasiAsRead(
            created.idNotifikasi,
            1,
            client
        );
        assert.equal(marked, true);
    });

    it("mencegah pelapor menandai notifikasi milik pelapor lain (403 FORBIDDEN)", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as NotifikasiSupabaseClient;

        const created = await createNotifikasi(
            1,
            "Notifikasi milik pelapor 1",
            client
        );

        await assert.rejects(
            () => markNotifikasiAsRead(created.idNotifikasi, 2, client),
            (err: unknown) =>
                err instanceof NotifikasiServiceError &&
                err.code === "FORBIDDEN" &&
                err.statusCode === 403
        );
    });

    it("createNotifikasi menolak idPelapor tidak valid atau pesan kosong (400)", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as NotifikasiSupabaseClient;

        await assert.rejects(
            () => createNotifikasi(0, "Pesan valid", client),
            (err: unknown) =>
                err instanceof NotifikasiServiceError &&
                err.code === "INVALID_NOTIFIKASI_INPUT" &&
                err.statusCode === 400
        );

        await assert.rejects(
            () => createNotifikasi(1, "   ", client),
            (err: unknown) =>
                err instanceof NotifikasiServiceError &&
                err.code === "INVALID_NOTIFIKASI_INPUT" &&
                err.statusCode === 400
        );
    });

    it("sendNotifikasi mengirim notifikasi valid (true) dan mengembalikan false jika null atau ID invalid", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as NotifikasiSupabaseClient;

        const created = await createNotifikasi(1, "Status berubah", client);
        const sent = await sendNotifikasi(created, client);
        assert.equal(sent, true);
        assert.equal(created.statusNotifikasi, "Terkirim");

        assert.equal(await sendNotifikasi(null, client), false);
        assert.equal(
            await sendNotifikasi({ ...created, idNotifikasi: 0 }, client),
            false
        );
    });

    it("markNotifikasiAsRead mengembalikan 404 jika notifikasi tidak ditemukan", async () => {
        const mock = createMockSupabaseClient();
        const client = mock as unknown as NotifikasiSupabaseClient;

        await assert.rejects(
            () => markNotifikasiAsRead(999, 1, client),
            (err: unknown) =>
                err instanceof NotifikasiServiceError &&
                err.code === "NOTIFIKASI_NOT_FOUND" &&
                err.statusCode === 404
        );
    });
});
