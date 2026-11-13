"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TanggapanData {
  status: string;
  komentar: string;
}

export interface LaporanDetail {
  judul: string;
  deskripsi: string;
  lokasi: string;
  foto?: string;
}

interface KartuTanggapLaporanProps {
  laporan: LaporanDetail;
  onSubmit?: (data: TanggapanData) => void;
  onClose?: () => void;
}

const MAX_KOMENTAR = 300;

const daftarStatus = ["Diterima", "Ditolak", "Ditangguhkan"];

const labelClass = "text-[16px] leading-[20px] text-[#5D6494]";
const dataClass = "text-[13px] leading-[18px] text-[#5D6494] break-words";
const inputClass =
  "w-full rounded-[10px] border border-[#5D6494] bg-white px-3 text-[16px] outline-none placeholder:text-[#A8BCF7]";

export function KartuTanggapLaporan({
  laporan,
  onSubmit,
  onClose,
}: KartuTanggapLaporanProps) {
  const [status, setStatus] = useState("");
  const [komentar, setKomentar] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!status) {
      setError("Status wajib dipilih");
      return;
    }
    setError("");
    onSubmit?.({ status, komentar });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[80%] max-w-[724px] flex-col rounded-[12px] border-2 border-black bg-white font-hywenhei"
    >
      {/* judul dan tombol close */}
      <div className="flex items-start justify-between pb-1 pl-[21px] pr-[19px] pt-4">
        <h1 className="text-[25px] leading-[30px] text-black">Response Form</h1>
        <button type="button" aria-label="Tutup" onClick={onClose} className="mt-1 text-black">
          <X className="size-[25px]" />
        </button>
      </div>

      <div className="flex flex-col gap-[23px] pb-3 pl-[21px] pr-[38px]">
        {/* O-68, O-69 */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}>Title</span>
          <p className={dataClass}>{laporan.judul}</p>
        </div>

        {/* O-70, O-71 */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}>Description</span>
          <p className={dataClass}>{laporan.deskripsi}</p>
        </div>

        {/* O-72, O-73 */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}>Location</span>
          <p className={dataClass}>{laporan.lokasi}</p>
        </div>

        {/* O-74, O-75 */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}>Additional Files</span>
          {laporan.foto ? (
            <img
                src={laporan.foto}
                alt={laporan.judul}
                className="h-[130px] w-[157px] border-[1.25px] border-black object-cover"
            />
          ) : (
            <p className={dataClass}>Tidak ada foto</p>
          )}
        </div>

        {/* O-76, O-77 */}
        <label className="flex w-[239px] max-w-full flex-col gap-1">
          <span className={labelClass}>Status*</span>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`${inputClass} h-[38px] appearance-none pr-8 ${
                status ? "text-[#5D6494]" : "text-[#A8BCF7]"
              }`}
            >
              <option value="">Select</option>
              {daftarStatus.map((s) => (
                <option key={s} value={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#A8BCF7]">
              ▼
            </span>
          </div>
          {error && <span className="text-[13px] text-red-600">{error}</span>}
        </label>

        {/* O-78, O-79 */}
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Comment</span>
          <textarea
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            maxLength={MAX_KOMENTAR}
            placeholder="Input comment here"
            className={`${inputClass} h-[99px] resize-none overflow-y-auto py-2`}
          />
          <span className="self-end text-[13px] text-[#A8BCF7]">
            {komentar.length}/{MAX_KOMENTAR}
          </span>
        </label>
      </div>

      {/* tombol submit */}
      <div className="flex justify-center py-4">
        <Button type="submit" variant="normal" size="auto" className="py-2 text-[16px]">
          Submit Response
        </Button>
      </div>
    </form>
  );
}