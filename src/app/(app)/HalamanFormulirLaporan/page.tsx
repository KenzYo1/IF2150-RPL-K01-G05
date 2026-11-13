"use client";

import { useState, useTransition } from "react";
import { KartuFormLapor, type FormLaporanData } from "@/components/laporan/KartuFormLapor";
import { createLapor } from "./actions";

export default function HalamanFormulirLaporan() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleCreate(data: FormLaporanData) {
    setError(null);

    const fd = new FormData();
    fd.append("judul", data.judul);
    fd.append("deskripsi", data.deskripsi);
    fd.append("lokasi", data.lokasi);
    if (data.foto) fd.append("foto", data.foto);

    startTransition(async () => {
      const result = await createLapor(fd);
      if (!result.ok) {
        setError(result.error ?? "Something went wrong");
        return;
      }
    });
  }

  return (
    <>
      <KartuFormLapor onSubmit={handleCreate} onClose={() => {/* close modal */}} />
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}
