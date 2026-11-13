"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  KartuTanggapLaporan,
  type TanggapanData,
  type LaporanDetail,
} from "@/components/tanggapanlaporan/KartuTanggapanLaporan";
import { getLaporanDetail, submitTanggapan } from "./actions";

export default function HalamanDetailTanggapan() {
  const router = useRouter();
  const id = useSearchParams().get("id");

  const [laporan, setLaporan] = useState<LaporanDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    if (!id) {
      setError("ID laporan tidak ada");
      return;
    }
    getLaporanDetail(id).then((res) => {
      if (res.ok) setLaporan(res.data);
      else setError(res.error);
    });
  }, [id]);

  function handleSubmit(data: TanggapanData) {
    if (pending || !laporan) return;
    setError(null);

    startTransition(async () => {
      const res = await submitTanggapan(Number(id), data);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push("/HalamanTanggapanLaporan");
    });
}
  return (
    <div className="min-h-screen bg-white">
      <main className="px-4 py-8">
        {error && <p className="text-red-600">{error}</p>}
        {!error && !laporan && <p>Memuat...</p>}
        {laporan && (
          <KartuTanggapLaporan
            laporan={laporan}
            onSubmit={handleSubmit}
            onClose={() => router.back()}
          />
        )}
      </main>
    </div>
  );
}