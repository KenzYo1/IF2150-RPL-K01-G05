import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { NotifikasiSupabaseClient } from "@/repositories/notifikasiRepository";
import {
    createNotifikasi,
    getNotifikasiPelapor,
    markNotifikasiAsRead,
    NotifikasiServiceError,
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
});
