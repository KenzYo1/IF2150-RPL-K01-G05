import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { resolveRole } from "@/lib/roles";
import { START_PAGE } from "@/types/start-pages";
import { isAllowedEmail } from "@/types/allowed-domains";
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
        if (!user) {
            return NextResponse.redirect(`${origin}/error`);
        }
        if (!user.email) {
            return NextResponse.redirect(`${origin}/error`);
        }
        if (!isAllowedEmail(user.email)) {
            return NextResponse.redirect(`${origin}/error`);
        }
        const role = await resolveRole(user);
        if (!role) {
            return NextResponse.redirect(`${origin}/error`);
        }
        return NextResponse.redirect(`${origin}/${START_PAGE[role]}`)

    }
    return NextResponse.redirect(`${origin}/login?error=nocode`);
} 