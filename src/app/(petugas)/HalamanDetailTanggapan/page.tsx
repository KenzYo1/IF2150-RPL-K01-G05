"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { KartuTanggapLaporan, type TanggapanData, type LaporanDetail } from "@/components/tanggapan/KartuTanggapLaporan";
import type { Role } from "@/types/role";


// dummy
const dummyRole = "petugas" as Role;

const dummyLaporan: LaporanDetail = {
    judul: "My toilet is filled with furina",
    deskripsi:
        "Guys what should I do, I found Furina from the hit game Genshin Impact stuck in my toilet in GKU 3.",
    lokasi: "GKU 3, Lantai 2",
    foto: "", 
};

export default function HalamanDetailTanggapan() {
    const router = useRouter();

    function handleSubmit(data: TanggapanData) {
        console.log("Tanggapan dikirim:", data);
        router.push("/HalamanTanggapan");
    }

    return (
        <div className="min-h-screen bg-white">
            <Header role={dummyRole} />
            <main className="px-4 py-8">
                <KartuTanggapLaporan
                    laporan={dummyLaporan}
                    onSubmit={handleSubmit}
                    onClose={() => router.back()}
                />
            </main>
        </div>
    );
}