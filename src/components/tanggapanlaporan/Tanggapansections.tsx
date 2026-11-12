"use client";

import { useRouter } from "next/navigation";
import { ReportRow } from "./tanggapanlaporancard";
import { ReportSection } from "./tanggapanlaporansection";

// Sesuaikan dua import di atas dengan nama file ReportRow dan ReportSection di folder ini.

export type TanggapanItem = {
    idLaporan: number | string;
    judulLaporan: string;
    status?: "ACCEPTED" | "REJECTED";
};

type Props = {
    unverified: TanggapanItem[];
    ongoing: TanggapanItem[];
    completed: TanggapanItem[];
};

// Komponen ini hanya menerima data lewat props, jadi tidak perlu diubah saat integrasi.
// Yang diganti hanya sumber data di page.tsx.
export function TanggapanSections({ unverified, ongoing, completed }: Props) {
    const router = useRouter();

    const keDetail = (id: number | string) => router.push(`/HalamanDetailTanggapan?id=${id}`);

    return (
        <div className="w-[880px] max-w-full">
            <ReportSection
                title="Unverified Reports"
                open
                reports={unverified.map((item) => (
                    <ReportRow
                        key={item.idLaporan}
                        title={item.judulLaporan}
                        actionLabel="Verify"
                        onAction={() => keDetail(item.idLaporan)}
                    />
                ))}
            />

            <ReportSection
                title="Ongoing Reports"
                open
                reports={ongoing.map((item) => (
                    <ReportRow
                        key={item.idLaporan}
                        title={item.judulLaporan}
                        actionLabel="Detail"
                        onAction={() => keDetail(item.idLaporan)}
                    />
                ))}
            />

            <ReportSection
                title="Completed Reports"
                open
                reports={completed.map((item) => (
                    <ReportRow
                        key={item.idLaporan}
                        title={item.judulLaporan}
                        status={item.status}
                        actionLabel="Edit"
                        onAction={() => keDetail(item.idLaporan)}
                    />
                ))}
            />
        </div>
    );
}