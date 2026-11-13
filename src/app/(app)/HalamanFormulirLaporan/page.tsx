"use client";

import { useState, useTransition } from "react";
import { KartuFormLapor, type FormLaporanData } from "@/components/laporan/KartuFormLapor";
import { createLapor } from "./actions";

export default function HalamanFormulirLaporan() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleCreate(data: FormLaporanData) {
    if (pending) return;
    setError(null);
    setSuccess(false);

    const fd = new FormData();
    fd.append("judul", data.judul);
    fd.append("deskripsi", data.deskripsi);
    fd.append("lokasi", data.lokasi);
    if (data.foto) fd.append("foto", data.foto);

    startTransition(async () => {
      try {
        const result = await createLapor(fd);
        if (!result.ok) {
          setError(result.error ?? "Something went wrong");
          return;
        }
        setSuccess(true);
      } catch (e) {
        console.error(e);
        setError("Something went wrong");
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-dvh gap-4">
      <KartuFormLapor onSubmit={handleCreate} onClose={() => {/* close modal */}} />
      {pending && (
        <p className="font-hywenhei text-[#5D6494] text-[14px] self-center">Submitting...</p>
      )}
      {success && (
        <p className="font-hywenhei text-green-600 text-[14px] self-center">
          Sukses!
        </p>
      )}
      {error && (
        <p className="font-hywenhei text-red-600 text-[14px] self-center">{error}</p>
      )}
    </div>
  );
}