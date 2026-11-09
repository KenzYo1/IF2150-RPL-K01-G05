import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/lib/roles";
import { START_PAGE } from "@/types/start-pages";
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);
        const { data: {user}, error: userError } = await supabase.auth.getUser();
        if (userError) {
            return NextResponse.redirect(`${origin}/error`);
        }
        const email = user?.email;
        const role = await getRole(String(email));
        if (!role) {
            return NextResponse.redirect(`${origin}/error`);
        }
        return NextResponse.redirect(`${origin}/${START_PAGE[role]}`)

    }
    return NextResponse.redirect(`${origin}/login?error=nocode`);
} 