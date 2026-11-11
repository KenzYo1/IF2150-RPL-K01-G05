import { Header } from "@/components/layout/Header";
import { AccountCard } from "@/components/layout/AccountCard";
import type { Role } from "@/types/role";

export default function HalamanAkun()
{
    const userRole: Role = "pelapor";
    return (
        <div className="min-h-screen">
            {/* Header */}
            <Header role={userRole} />

            {/* Account Card */}
            <main className="flex justify-center p-12">
                <AccountCard role="pelapor" />
            </main>
        </div>
    );
}