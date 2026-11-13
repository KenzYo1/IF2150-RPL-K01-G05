import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LaporanCard } from "@/components/layout/laporancard";
import { resolveRole } from "@/lib/roles";
import { resolveLaporanFotoUrl } from "@/lib/supabase/storage";
import { getAllPelapor } from "@/repositories/pelaporRepository";
import { getValidLaporanService } from "@/services/laporanService";
import {
    getLikedLaporanIdsByPelaporService,
    resolveAuthenticatedPelaporForLike,
} from "@/services/likeService";
import type { LaporanEntity } from "@/types/laporan";
import type { Role } from "@/types/role";

export const dynamic = "force-dynamic";

export default async function HalamanLaporan() {
    let userRole: Role;
    try {
        userRole = await resolveRole();
    } catch {
        redirect("/login");
    }

    let daftarLaporan: LaporanEntity[] = [];
    const pelaporNameById = new Map<number, string>();
    const likedLaporanIds = new Set<number>();
    let errorMessage: string | null = null;

    const [laporanResult, pelaporResult, likeProfileResult] =
        await Promise.allSettled([
            getValidLaporanService(),
            getAllPelapor(),
            userRole === "pelapor"
                ? resolveAuthenticatedPelaporForLike()
                : Promise.resolve(null),
        ]);

    if (laporanResult.status === "fulfilled") {
        daftarLaporan = laporanResult.value;
    } else {
        console.error("Gagal mengambil daftar laporan:", laporanResult.reason);
        errorMessage = "Gagal memuat daftar laporan. Silakan coba lagi.";
    }

    if (pelaporResult.status === "fulfilled") {
        for (const pelapor of pelaporResult.value) {
            if (pelapor.namaPelapor.trim()) {
                pelaporNameById.set(pelapor.idPelapor, pelapor.namaPelapor.trim());
            }
        }
    }

    if (likeProfileResult.status === "fulfilled" && likeProfileResult.value) {
        const likedIds = await getLikedLaporanIdsByPelaporService(
            likeProfileResult.value.idPelapor
        ).catch(() => []);
        for (const id of likedIds) {
            likedLaporanIds.add(id);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="flex flex-col items-center gap-8 px-4 py-8">
                {userRole === "pelapor" && (
                    <Link
                        href="/HalamanFormulirLaporan"
                        className="relative flex h-[90px] w-[880px] max-w-full items-start rounded-xl border-2 border-[#485AB8] px-5 py-3 hover:bg-[#485AB8]/5"
                    >
                        <span className="font-hywenhei text-[#608BE0]">Make a report!</span>
                        <div className="absolute bottom-3 right-3">
                            <Image
                                src="/icon/Expand.svg"
                                alt="Expand"
                                width={20}
                                height={20}
                                className="size-5"
                            />
                        </div>
                    </Link>
                )}

                {errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : daftarLaporan.length === 0 ? (
                    <p className="text-gray-500">Belum ada laporan.</p>
                ) : (
                    daftarLaporan.map((laporan) => {
                        const namaPelapor =
                            laporan.idPelapor !== null
                                ? (pelaporNameById.get(laporan.idPelapor) ??
                                    `Pelapor #${laporan.idPelapor}`)
                                : "Anonim";

                        return (
                            <LaporanCard
                                key={laporan.idLaporan}
                                idLaporan={laporan.idLaporan}
                                nama={namaPelapor}
                                avatar=""
                                judul={laporan.judulLaporan ?? ""}
                                gambar={resolveLaporanFotoUrl(laporan.fotoLaporan)}
                                likes={laporan.likeLaporan}
                                deskripsi={laporan.descLaporan}
                                initialLiked={likedLaporanIds.has(laporan.idLaporan)}
                                canLike={userRole === "pelapor"}
                            />
                        );
                    })
                )}
            </main>
        </div>
    );
}
