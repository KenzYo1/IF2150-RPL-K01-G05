import { Header } from "@/components/layout/Header";
import { LeaderboardItem } from "@/components/layout/LbComponent";
import type { Role } from "@/types/role";

// Dummy Data
const rawLeaderboardData = 
[
    { id: "u1", name: "Furina De Fontaine", points: 8888, avatarUrl: "" },
    { id: "u2", name: "aaa", points: 888, avatarUrl: "" },
    { id: "u3", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u4", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u5", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u6", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u7", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u8", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u9", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u10", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u11", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u12", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u13", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u14", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u15", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u16", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u17", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u18", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u19", name: "aaa", points: 88, avatarUrl: "" },
    { id: "u20", name: "aaa", points: 88, avatarUrl: "" },
];

export default function HalamanLeaderboard() 
{
    const userRole: Role = "pelapor";
    return(
        <div className="min-h-screen">
            {/* Header */}
            <Header role={userRole} />

            {/* Leaderboard title */}
            <main className="flex flex-col items-center pt-[30px] pb-[30px]">
                <div className="w-[1070px] pb-[25px]">
                    <h1 className="text-[25px] font-hywenhei text-[#000000]">
                        Leaderboard
                    </h1>
                </div>

                {/* Leaderboard list */}
                <div className="flex w-full flex-col items-center gap-[20px]">
                    {rawLeaderboardData.map((user, index) => (
                        <LeaderboardItem
                            key={user.id}
                            rank={index + 1} // increment the rank/tier
                            name={user.name}
                            points={user.points}
                            avatarUrl={user.avatarUrl}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}