"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
 
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
        redirect("/halamanFurinaOrSomething");
    }
}

export async function loginByITBEmail() {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${location.origin}/oauth/consent`}
    })
}