"use server"

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { resolveRole } from "@/lib/roles";
import { START_PAGE } from "@/types/start-pages";



export async function loginWithPass(formData: FormData) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    })
    if (error) {
        redirect("/error");
    }
    else {
        const {data: { user }} = await supabase.auth.getUser();
        if (!user) {
            redirect("/error");
        }
        const role = await resolveRole(user);
        if (!role) redirect ("/error"); 
        redirect(START_PAGE[role]);
    }
}

export async function loginByITBEmail() {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${origin}/auth/callback`}
    })

    if (error) redirect("/error");
    if (data.url) redirect(data.url);
}

export async function onForgotPass() {
    
}