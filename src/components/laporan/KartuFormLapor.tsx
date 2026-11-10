"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FormLaporanData {
  judul: string;
  deskripsi: string;
  lokasi: string;
  foto: File | null;
}

interface KartuFormLaporProps {
  onSubmit?: (data: FormLaporanData) => void;
  onClose?: () => void;
}

const MAX_FOTO_MB = 10; // ukuran file foto sementara
const MAX_JUDUL = 100;
const MAX_DESKRIPSI = 300;

// lokasi sementara
const daftarLokasi = ["Labtek V Lt 1", "Labtek V Lt 2", "Labtek V Lt 3", "Labtek V Lt 4"];

const labelClass = "text-[16px] leading-[20px] text-[#5D6494]";
const inputClass =
  "w-full rounded-[10px] border border-[#5D6494] bg-white px-3 text-[16px] outline-none placeholder:text-[#A8BCF7]";

export function KartuFormLapor({ onSubmit, onClose }: KartuFormLaporProps) {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [errorFoto, setErrorFoto] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function pilihFoto(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorFoto("File harus berupa gambar");
      return;
    }
    if (file.size > MAX_FOTO_MB * 1024 * 1024) {
      setErrorFoto(`Ukuran maksimal ${MAX_FOTO_MB} MB`);
      return;
    }
    setErrorFoto("");
    setFoto(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ judul, deskripsi, lokasi, foto });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-[80%] max-w-[724px] flex-col rounded-[12px] border-2 border-black bg-white font-hywenhei"
    >
      {/* judul dan tombol close */}
      <div className="flex items-start justify-between pb-1 pl-[21px] pr-[19px] pt-4">
        <h1 className="text-[25px] leading-[30px] text-black">Report Form</h1>
        <button type="button" aria-label="Tutup" onClick={onClose} className="mt-1 text-black">
          <X className="size-[25px]" />
        </button>
      </div>

      <div className="flex flex-col gap-[23px] pb-3 pl-[21px] pr-[40px]">
        {/* O-55, O-56 */}
        <label className="flex w-[339px] max-w-full flex-col gap-1">
          <span className={labelClass}>Title*</span>
          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            maxLength={MAX_JUDUL}
            placeholder="Input title here"
            className={`${inputClass} h-10`}
          />
        </label>

        {/* O-57, O-58 */}
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Description*</span>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            maxLength={MAX_DESKRIPSI}
            placeholder="Input description here"
            className={`${inputClass} h-[101px] resize-none overflow-y-auto py-2`}
          />
          <span className="self-end text-[13px] text-[#A8BCF7]">
            {deskripsi.length}/{MAX_DESKRIPSI}
          </span>
        </label>

        {/* O-59, O-60 */}
        <label className="flex w-[239px] max-w-full flex-col gap-1">
          <span className={labelClass}>Location*</span>
          <div className="relative">
            <select
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className={`${inputClass} h-10 appearance-none pr-8 ${
                lokasi ? "text-[#5D6494]" : "text-[#A8BCF7]"
              }`}
            >
              <option value="">Select</option>
              {daftarLokasi.map((l) => (
                <option key={l} value={l} className="text-black">
                  {l}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#A8BCF7]">
              ▼
            </span>
          </div>
        </label>

        {/* O-61, O-62, O-63 */}
        <div className="flex flex-col gap-1">
          <span className={labelClass}>Additional Files*</span>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              pilihFoto(e.dataTransfer.files?.[0] ?? null);
            }}
            className={`flex h-[192px] w-full cursor-pointer flex-col items-center justify-center rounded-[6px] border border-dashed border-[#5D6494] text-center text-[#A8BCF7] ${
              dragging ? "bg-[#A8BCF7]/20" : ""
            }`}
          >
            <Upload className="size-[44px]" strokeWidth={1.5} />
            <p className="mt-2 text-[16px] leading-[18px]">
              Browse
              <br />
              or
              <br />
              Drag and Drop a File here
            </p>
            <p className="mt-1 text-[13px]">Upload 1 image file, max {MAX_FOTO_MB} mb</p>
            {foto && <p className="mt-1 text-[13px] text-[#5D6494]">{foto.name}</p>}
            {errorFoto && <p className="mt-1 text-[13px] text-red-600">{errorFoto}</p>}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => pilihFoto(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      {/* tombol submit (O-64) */}
      <div className="flex justify-center py-4">
        <Button type="submit" variant="normal" size="auto" className="text-[16px]">
          Submit Report
        </Button>
      </div>
    </form>
  );
}