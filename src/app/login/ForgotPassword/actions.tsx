"use server"

import { createClient } from "@/lib/supabase/server"
import { resolveRole } from "@/lib/roles";
import { START_PAGE } from "@/types/start-pages";
import { redirect } from "next/navigation";

export const sendOtp = async (email: string) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    return error?.message ?? null;
}

export const verifyOtp = async (email: string, token: string) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ email, token, type:"email" });

    if (error) return error.message;
    const {data: { user }} = await supabase.auth.getUser();
    if (!user) {
        redirect("/error");
    }
    const role = await resolveRole(user);
    if (!role) redirect ("/error"); 
    redirect(START_PAGE[role]);

    return null;
}

