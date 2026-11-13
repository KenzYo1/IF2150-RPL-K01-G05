import {
  TanggapanSections,
  type TanggapanItem,
} from "@/components/tanggapanlaporan/Tanggapansections";
import { listLaporanService } from "@/services/laporanService";
import { STATUS } from "@/types/tanggapan";

export default async function HalamanTanggapan() {
    const all = await listLaporanService();

    const unverified: TanggapanItem[] = [];
    const ongoing: TanggapanItem[] = [];
    const completed: TanggapanItem[] = [];

    for (const l of all) {
    const item = {
        idLaporan: l.idLaporan,
        judulLaporan: l.judulLaporan ?? "(Tanpa judul)",
    };

    const ditolak =
        l.statusLaporan === STATUS.DITOLAK || l.statusModerasi === STATUS.DITOLAK;

    if (ditolak) {
        completed.push({ ...item, status: "REJECTED" });
    } else if (l.statusModerasi === STATUS.MODERASI_MENUNGGU) {
        unverified.push(item);
    } else if (l.statusLaporan === STATUS.MODERASI_MENUNGGU) {
        ongoing.push(item);
    } else {
        // any other status (e.g. "selesai") counts as done
        completed.push({ ...item, status: "ACCEPTED" });
    }
    }

    return (
    <div className="min-h-screen bg-white">
        <main className="flex flex-col items-center gap-8 px-4 py-8">
        <TanggapanSections
            unverified={unverified}
            ongoing={ongoing}
            completed={completed}
        />
        </main>
    </div>
    );
    }