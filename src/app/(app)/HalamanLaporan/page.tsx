import { LaporanCard } from "@/components/layout/laporancard";
import { createClient } from "@/lib/supabase/server";
import { listLaporanService } from "@/services/laporanService";
import type { Role } from "@/types/role";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HalamanLaporan() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userRole = user?.app_metadata?.role as Role | undefined;
    if (!userRole) {
        redirect("/login");
    }

    const daftarLaporan = await listLaporanService();

    return (
        <div className="min-h-screen bg-white">
            <main className="flex flex-col items-center gap-8 px-4 py-8">
                <Link href="/HalamanFormulirLaporan" className="relative flex h-[90px] w-[880px] max-w-full items-start rounded-xl border-2 border-[#485AB8] px-5 py-3 hover:bg-[#485AB8]/5">

                    <span className="font-hywenhei text-[#608BE0]">Make a report!</span>
                    <div className="absolute bottom-3 right-3">
                        <img src="/icon/Expand.svg" alt="Expand" className="size-5" />
                    </div>
                </Link>
                {daftarLaporan.length === 0 ? (
                    <p className="text-gray-500">Belum ada laporan.</p>
                ) : (
                    daftarLaporan.map((laporan) => (
                        <LaporanCard
                            key={laporan.idLaporan}
                            nama={`pelapor #${laporan.idPelapor ?? "-"}`}
                            avatar=""
                            judul={laporan.judulLaporan ?? ""}
                            gambar={laporan.fotoLaporan ?? ""}
                            likes={laporan.likeLaporan}
                            deskripsi={laporan.descLaporan} />
                    ))
                )}
            </main>
        </div >);
}


