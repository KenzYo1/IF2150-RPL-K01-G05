// TEMPORARY preview of HalamanLaporan with fake data (no Supabase needed).
// Delete this folder once real Supabase keys are available.
// Switch role with ?role=pelapor | petugas | admin
import Link from "next/link";
import { LaporanCard } from "@/components/layout/laporancard";
import type { Role } from "@/types/role";

const ROLES: Role[] = ["pelapor", "petugas", "admin"];

const daftarLaporan = [
    {
        idLaporan: 1,
        idPelapor: 1,
        judulLaporan: "Lampu koridor mati",
        fotoLaporan: "/Logo.png",
        likeLaporan: 6767,
        descLaporan:
            "Lampu di koridor lantai 3 GKU sudah mati selama seminggu, jadi gelap sekali kalau malam. Mohon segera diperbaiki.",
    },
    {
        idLaporan: 2,
        idPelapor: 2,
        judulLaporan: "Keran wastafel bocor",
        fotoLaporan: null,
        likeLaporan: 1234,
        descLaporan: "Keran di toilet lantai 2 terus menetes.",
    },
];

export default async function PreviewLaporan({
    searchParams,
}: {
    searchParams: Promise<{ role?: string }>;
}) {
    const { role } = await searchParams;
    const userRole: Role = ROLES.includes(role as Role) ? (role as Role) : "pelapor";

    return (
        <div className="min-h-screen bg-white">
            <main className="flex flex-col items-center gap-8 px-4 py-8">
                <Link href="/HalamanFormulirLaporan" className="relative flex h-[90px] w-[880px] max-w-full items-start rounded-xl border-2 border-[#485AB8] px-5 py-3 hover:bg-[#485AB8]/5">
                    <span className="font-hywenhei text-[#608BE0]">Make a report!</span>
                    <div className="absolute bottom-3 right-3">
                        <img src="/icon/Expand.svg" alt="Expand" className="size-5" />
                    </div>
                </Link>

                {daftarLaporan.map((laporan) => (
                    <LaporanCard
                        key={laporan.idLaporan}
                        nama={`pelapor #${laporan.idPelapor ?? "-"}`}
                        avatar=""
                        judul={laporan.judulLaporan ?? ""}
                        gambar={laporan.fotoLaporan ?? ""}
                        likes={laporan.likeLaporan}
                        deskripsi={laporan.descLaporan} />
                ))}
            </main>
        </div>
    );
}
