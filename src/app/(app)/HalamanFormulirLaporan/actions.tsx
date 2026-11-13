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

    const judul = String(input.get("judul") ?? "").trim();
    const deskripsi = String(input.get("deskripsi") ?? "").trim();
    const lokasi = String(input.get("lokasi") ?? "").trim();
    const foto = input.get("foto");

    if (!judul || !deskripsi || !lokasi) {
    return { ok: false as const, error: "Semua field wajib diisi" };
    }
    if (judul.length > 100 || deskripsi.length > 300) {
    return { ok: false as const, error: "Teks terlalu panjang" };
    }
    if (!(foto instanceof File) || foto.size === 0) {
    return { ok: false as const, error: "Foto wajib diunggah" };
    }
    if (!foto.type.startsWith("image/") || foto.size > MAX_FOTO_BYTES) {
    return { ok: false as const, error: "Foto tidak valid" };
    }

    try {
    const { data: profile, error: profileError } = await supabase.auth.getUser();
    if (profileError || !profile) {
    return { ok: false as const, error: "Profil pelapor tidak ditemukan" };
    }

    // 4. Upload the photo to Storage
    const ext = foto.name.split(".").pop() ?? "jpg";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
    .from("laporan-foto") // your bucket name
    .upload(path, foto, { contentType: foto.type });

    if (uploadError) {
    console.error("upload failed:", uploadError);
    return { ok: false as const, error: "Gagal mengunggah foto" };
    }


    const laporanInput: CreateLaporanInput = {
    judulLaporan: judul,
    descLaporan: deskripsi,
    lokasi,
    fotoLaporan: path,          
    idPelapor: Number(profile.user.id),  
    };

    const laporan = await createLaporanService(laporanInput);

    revalidatePath("/laporan");
    return { ok: true as const, data: laporan };
    } catch (e) {
    console.error("createLapor failed:", e);
    return { ok: false as const, error: "Gagal membuat laporan" };
    }
    }