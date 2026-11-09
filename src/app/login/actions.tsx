"use server"

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { getRole } from "@/lib/roles";
 import { Role } from "@/types/role";

const START_PAGE: Record<Role, string> = {
    admin: "/HalamanContohAdmin",
    petugas: "/HalamanContohPetugas",
    pelapor: "/HalamanContohPelapor"
}

export async function loginWithPass(formData: FormData) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    })
    if (error) {
        // TODO Give status here lol;
    }
    else {
        const role = await getRole(String(formData.get("email")));
        if (!role) redirect ("/login?error=norole"); 
        redirect("/halamanFurinaOrSomething");
    }
}

export async function loginByITBEmail() {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${origin}/oauth/consent`}
    })

    if (error) redirect("/error");
    if (data.url) redirect(data.url);
}