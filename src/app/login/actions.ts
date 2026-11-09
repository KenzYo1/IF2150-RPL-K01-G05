"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { headers } from "next/headers";

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
    const origin = (await headers()).get("origin") ?? "http://localhost:3000";

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/oauth/consent`,
        },
    });

    if (error) {
        return;
    }

    if (data.url) {
        redirect(data.url);
    }
}