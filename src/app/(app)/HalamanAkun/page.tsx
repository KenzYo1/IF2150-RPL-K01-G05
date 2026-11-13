import { createClient } from "@/lib/supabase/server";
import { resolveRole } from "@/lib/roles";
import { getDataPelaporByAuthUserId } from "@/repositories/pelaporRepository"; 
import { AccountCard } from "@/components/layout/AccountCard";

export default async function HalamanAkun() {
  const role = await resolveRole();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pelapor = user ? await getDataPelaporByAuthUserId(user.id) : null;

  return (
    <div className="min-h-screen">
      <main className="flex justify-center p-12">
        <AccountCard
          role={role}
          name={pelapor?.namaPelapor ?? "-"}          
          email={user?.email ?? "-"}
          points={pelapor?.poinPelapor ?? 0}     
        />
      </main>
    </div>
  );
}