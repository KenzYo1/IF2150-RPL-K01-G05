"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type LaporanCardProps = {
    idLaporan?: number;
    nama: string;
    avatar: string;
    judul: string;
    gambar: string;
    likes: number;
    deskripsi: string;
    initialLiked?: boolean;
    canLike?: boolean;
};

type LikeApiResponse = {
    success?: boolean;
    data?: {
        idLaporan: number;
        idPelapor: number;
        liked: boolean;
        jumlahLike: number;
    };
    error?: {
        code?: string;
        message?: string;
    };
};

const LIKE_ICON_PATH =
    "M9.10006 25.4904C9.80073 25.8259 10.5671 26 11.3433 26H22.4925C25.0612 26 27.2471 24.1205 27.6437 21.571L28.949 13.183C29.3445 10.6415 27.3885 8.3452 24.8281 8.3452H17.9798V3.40534C17.9798 1.52462 16.4623 0 14.5903 0C13.3634 0 12.2323 0.666125 11.6329 1.74167L7.30056 9.51529C7.0391 9.98442 6.90181 10.5131 6.90181 11.0507V22.4542C6.90181 23.6659 7.59528 24.7699 8.68415 25.2912L9.10006 25.4904ZM2.07791 9.89922C1.52682 9.89922 0.998291 10.1192 0.608607 10.5107C0.218923 10.9022 0 11.4332 0 11.9868L1.03649e-06 22.6991C1.03649e-06 23.2529 0.218923 23.7838 0.608607 24.1754C0.998289 24.5668 1.52681 24.7868 2.07791 24.7868L3.11352 24.7864C3.68924 24.7862 4.15581 24.3171 4.15581 23.7388V10.9464C4.15581 10.6685 4.04589 10.4019 3.85024 10.2055C3.65458 10.009 3.38924 9.89866 3.11262 9.89878L2.07791 9.89922Z";

export function LaporanCard({
    idLaporan,
    nama,
    avatar,
    judul,
    gambar,
    likes,
    deskripsi,
    initialLiked = false,
    canLike = false,
}: LaporanCardProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(likes);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [likeError, setLikeError] = useState<string | null>(null);

    const isInteractive = canLike && typeof idLaporan === "number" && idLaporan > 0;

    async function handleToggleLike() {
        if (!isInteractive || isSubmitting) {
            return;
        }

        const prevLiked = liked;
        const prevCount = likeCount;
        const nextLiked = !prevLiked;

        setLikeError(null);
        setLiked(nextLiked);
        setLikeCount(Math.max(0, prevCount + (nextLiked ? 1 : -1)));
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/like", {
                method: nextLiked ? "POST" : "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idLaporan }),
            });

            const payload = (await response.json().catch(() => ({}))) as LikeApiResponse;

            if (response.ok && payload.success && payload.data) {
                setLiked(payload.data.liked);
                setLikeCount(payload.data.jumlahLike);
                return;
            }

            if (nextLiked && response.status === 409) {
                setLiked(true);
                setLikeCount(prevCount);
                return;
            }

            if (!nextLiked && response.status === 404) {
                setLiked(false);
                setLikeCount(prevCount);
                return;
            }

            setLiked(prevLiked);
            setLikeCount(prevCount);
            setLikeError(payload.error?.message ?? "Gagal memproses like");
        } catch {
            setLiked(prevLiked);
            setLikeCount(prevCount);
            setLikeError("Gagal terhubung ke server");
        } finally {
            setIsSubmitting(false);
        }
    }

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
            <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    {isInteractive ? (
                        <button
                            type="button"
                            onClick={handleToggleLike}
                            disabled={isSubmitting}
                            aria-pressed={liked}
                            aria-label={liked ? "Batalkan like laporan" : "Beri like laporan"}
                            className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-[#485AB8]/10 active:scale-95 disabled:opacity-60 cursor-pointer"
                        >
                            <svg
                                viewBox="-1 -1 31 28"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    d={LIKE_ICON_PATH}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill={liked ? "#485AB8" : "none"}
                                    stroke={liked ? "#485AB8" : "#5D6494"}
                                    strokeWidth={2}
                                />
                            </svg>
                            <span
                                className={`text-xl font-bold ${
                                    liked ? "text-[#485AB8]" : "text-black"
                                }`}
                            >
                                {likeCount}
                            </span>
                        </button>
                    ) : (
                        <>
                            <svg
                                viewBox="0 0 29 26"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    d={LIKE_ICON_PATH}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="#5D6494"
                                />
                            </svg>
                            <span className="text-xl font-bold">{likeCount}</span>
                        </>
                    )}
                </div>
                {likeError && (
                    <p className="text-xs text-red-500">{likeError}</p>
                )}
            </div>

            {/* Deskripsi */}
            <p className="text-justify font-semibold leading-snug">{deskripsi}</p>
        </article>
    );
}
