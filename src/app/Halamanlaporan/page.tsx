import { Header } from "@/components/layout/Header";
import { LaporanCard } from "@/components/layout/laporancard";
import { createClient } from "@/lib/supabase/server";
import { listLaporanService } from "@/services/laporanService";
import type { Role } from "@/types/role";
import { redirect } from "next/navigation";

export default async function HalamanLaporan() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userRole = user?.app_metadata?.role as Role | undefined;
    if (!userRole) {
        redirect("/login");
    }

    const daftarLaporan = await listLaporanService();

    return (
        <div className="min-h-screen">
            <Header role={userRole} />
            <main className="flex-col centered gap">
                {daftarLaporan.map(l => )}
            </main>
        </div >);
}


