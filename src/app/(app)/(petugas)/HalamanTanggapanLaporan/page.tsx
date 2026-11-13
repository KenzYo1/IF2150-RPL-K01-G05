import { TanggapanSections, type TanggapanItem } from "@/components/tanggapanlaporan/Tanggapansections";
import type { Role } from "@/types/role";

// dummy
const dummyRole = "petugas" as Role;

const dummyUnverified: TanggapanItem[] = [
    { idLaporan: 1, judulLaporan: "My toilet is filled with furina" },
    { idLaporan: 2, judulLaporan: "My toilet is gone" },
];

const dummyOngoing: TanggapanItem[] = [
    { idLaporan: 3, judulLaporan: "My toilet is filled with furina" },
    { idLaporan: 4, judulLaporan: "My toilet is gone" },
];

const dummyCompleted: TanggapanItem[] = [
    { idLaporan: 5, judulLaporan: "My toilet is filled with furina", status: "ACCEPTED" },
    { idLaporan: 6, judulLaporan: "My toilet is gone", status: "REJECTED" },
];

export default function HalamanTanggapan() {
    return (
        <div className="min-h-screen bg-white">
            <main className="flex flex-col items-center gap-8 px-4 py-8">
                <TanggapanSections
                    unverified={dummyUnverified}
                    ongoing={dummyOngoing}
                    completed={dummyCompleted}
                />
            </main>
        </div>
    );
}