import Image from "next/image";
import { LeaderboardItem } from "@/components/layout/LbComponent";
import {
    getMyLeaderboardService,
    getTop20Pelapor,
} from "@/services/leaderboardService";
import type { LeaderboardEntry, MyLeaderboardData } from "@/types/leaderboard";

export const dynamic = "force-dynamic";

export default async function HalamanLeaderboard() {
    let top20: LeaderboardEntry[] = [];
    let myData: MyLeaderboardData | null = null;
    let errorMessage: string | null = null;

    try {
        top20 = await getTop20Pelapor();
    } catch (error) {
        console.error("Gagal mengambil data top 20 leaderboard:", error);
        errorMessage = "Gagal memuat data leaderboard.";
    }

    try {
        myData = await getMyLeaderboardService();
    } catch {
        // Pengguna bukan pelapor atau belum terautentikasi
        myData = null;
    }

    return (
        <div className="min-h-screen">
            {/* Leaderboard title */}
            <main className="flex flex-col items-center pt-[30px] pb-[30px] gap-[20px]">
                <div className="w-[1070px] max-w-full pb-[13px]">
                    <h1 className="text-[25px] font-hywenhei text-[#000000]">
                        Leaderboard
                    </h1>
                </div>

                {errorMessage ? (
                    <div className="w-[1070px] max-w-full text-center py-8">
                        <p className="text-red-500 font-hywenhei text-[16px]">
                            {errorMessage}
                        </p>
                    </div>
                ) : top20.length === 0 ? (
                    <div className="w-[1070px] max-w-full text-center py-8">
                        <p className="text-gray-500 font-hywenhei text-[16px]">
                            Belum ada data pelapor.
                        </p>
                    </div>
                ) : (
                    /* Leaderboard list */
                    <div className="flex w-full flex-col items-center gap-[20px]">
                        {top20.map((user) => (
                            <LeaderboardItem
                                key={user.idPelapor}
                                rank={user.rank}
                                name={user.namaPelapor || `Pelapor #${user.idPelapor}`}
                                points={user.poinPelapor}
                            />
                        ))}
                    </div>
                )}

                {/* Bottom Part: Own account / ellipsis */}
                {myData && (
                    <>
                        {!myData.inTop20 ? (
                            <Image
                                src="/3dotlb.svg"
                                alt="3dot"
                                width={12}
                                height={42}
                                className="h-[42px] w-auto mb-[95px]"
                            />
                        ) : (
                            <div className="h-[95px]" />
                        )}

                        {/* White Rectangle to cover the back */}
                        <div className="fixed bottom-0 left-0 w-full h-[55px] bg-white z-10 pointer-events-none" />

                        {/* Own Account */}
                        <div className="fixed bottom-0 left-0 flex w-full flex-col items-center pb-[30px] z-20">
                            <LeaderboardItem
                                key={`own-${myData.idPelapor}`}
                                rank={myData.rank}
                                name={myData.namaPelapor || `Pelapor #${myData.idPelapor}`}
                                points={myData.poinPelapor}
                            />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
