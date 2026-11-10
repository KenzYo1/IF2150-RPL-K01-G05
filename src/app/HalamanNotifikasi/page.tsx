import { Header } from "@/components/layout/Header";
import { Notification } from "@/components/layout/NotifCard";
import type { Role } from "@/types/role";

// Dummy data
const notificationsData = [
    {
    id: 1,
    title: "Your report got accepted and is being processed!",
    description: 'Your submitted report "Furina???" has been verified.',
    isRead: false,
    },
    {
    id: 2,
    title: "You received +10 points!",
    description: 'You earned +10 points from you report "Help, I\'m constipated"! Thank you for your contribution.',
    isRead: false,
    },
    {
    id: 3,
    title: "Your report got rejected...",
    description: 'Unfortunately, your report "Motorku mana yh?" has been rejected.',
    isRead: false,
    },
    {
    id: 4,
    title: "Your report has been submitted!",
    description: 'Your report "DUarRRRR" has been submitted and is being verified.',
    isRead: true, // This will now tell the Notification card to turn grey
    },
    {
    id: 5,
    title: "Congratulations! You have received the leaderboard prize!",
    description: "Congratulations on making top 20! To accept your gift please follow this ins....",
    isRead: false,
    },
];

export default function HalamanNotifikasi()
{
    const userRole: Role = "pelapor";

    return (
        <div className="min-h-screen">
            {/* Header */}
            <Header role={userRole} />

            {/* Notification Part */}
            <main className="flex flex-col items-center pt-[30px] pb-[30px]">
                {/* Top part */}
                <div className="w-[1116px]">
                    {/* Page title */}
                    <h1 className="text-[25px] font-hywenhei text-[#000000] pl-[25px]">
                        Notifications
                    </h1>

                    {/* Line */}
                    <hr className="mt-[5px] mb-[20px] border-t-1 border-[#000000]" />
                </div>

                {/* Notification Card List */}
                <div className="flex flex-col gap-[19px] w-full items-center">
                    {notificationsData.map((notif) => (
                        < Notification
                            key={notif.id}
                            title={notif.title}
                            desc={notif.description}
                            isRead={notif.isRead}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}