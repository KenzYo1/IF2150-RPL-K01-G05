// app/(app)/laporan/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createLaporanService } from "@/services/laporanService";
import type { CreateLaporanInput } from "@/types/laporan";

const MAX_FOTO_BYTES = 10 * 1024 * 1024;

export async function createLapor(input: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return { ok: false as const, error: "Not authenticated" };
    }

    const foto = input.get("foto");

    try {
        const laporan = await createLaporanService({
            judulLaporan: String(input.get("judul") ?? ""),
            descLaporan: String(input.get("deskripsi") ?? ""),
            lokasi: String(input.get("lokasi") ?? ""),
            fotoFile: foto instanceof File && foto.size > 0 ? foto : undefined,
        });
        revalidatePath("/HalamanLaporan");
        return({ ok: false as const, data: laporan });
    } catch (e) {
        console.error("createLapor failed:", e);
        return { ok: false as const, error: "Gagal membuat laporan" };
    }
}