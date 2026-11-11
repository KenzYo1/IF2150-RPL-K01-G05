import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

type LaporanCardProps = {
    nama: string;
    avatar: string;
    judul: string;
    gambar: string;
    likes: number;
    deskripsi: string;
};

export function LaporanCard({
    nama,
    avatar,
    judul,
    gambar,
    likes,
    deskripsi,
}: LaporanCardProps) {
    return (
        <article className="flex w-[640px] max-w-full flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
            {/* Header: avatar + nama pelapor */}
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    <AvatarImage src={avatar} alt={nama} />
                    <AvatarFallback className="bg-black" />
                </Avatar>
                <span className="text-xl font-bold">{nama}</span>
            </div>

            {/* Judul laporan */}
            <h2 className="text-xl font-bold">{judul}</h2>

            {/* Gambar laporan*/}
            {gambar && (
                <div className="flex justify-center">
                    <img
                        src={gambar}
                        alt={judul}
                        className="max-h-[300px] w-auto max-w-full rounded-xl border border-gray-200 object-contain"
                    />
                </div>
            )}

            {/* Jumlah like */}
            <div className="mt-2 flex items-center gap-2">
                <img src="/icon/Like.svg" alt="Like" className="size-6" />
                <span className="text-xl font-bold">{likes}</span>
            </div>

            {/* Deskripsi */}
            <p className="text-justify font-semibold leading-snug">{deskripsi}</p>
        </article>
    );
}
