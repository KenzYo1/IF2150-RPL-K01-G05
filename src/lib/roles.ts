import "server-only";
import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabase/admin";
import { Role } from "@/types/role"

export async function getRole(email: string): Promise<Role | null> {
    const e = email.toLowerCase();
    
    const { data, error } = await supabaseAdmin
        .from("pelapor")
        .select("nim_nip")
        .eq("email", e)
        .maybeSingle();
    if (error) {
    console.error(
        "resolveRole failed " +
        JSON.stringify({
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
        })
    );
    throw new Error("Fetching from database failed: " + error.message);
}
    if (!data) {
        const { data: created,  error: insertError } = await supabaseAdmin
            .from("pelapor")
            .upsert({ email: e, nim_nip: getUserNimFromEmail(e) },
                    {onConflict: "email", ignoreDuplicates: true}
        );
        if (insertError) {
            throw new Error("Creating user failed: " + insertError.message);
        }
        if (e.endsWith("@staff.itb.ac.id")) { // nim_nip tidak terdefinisi
            return "petugas";
        }
        return "pelapor";
    }

    // Note admin gak bisa ditentuin dari email, security reasons

    if ((String(data.nim_nip)).length == 18 || e.endsWith("@staff.itb.ac.id")) {
        return "petugas";
    }
    return "pelapor";
}

// this one uhh resolves it generally
export async function resolveRole(user: User): Promise<Role> {
    const current = user.app_metadata.role;
    if (current) {
        return current as Role;
    }
    if (!user.email) {
        throw new Error("User has no email");
    }
    const role = await getRole(user.email);
    if (!role) {
        throw new Error("Unable to determine user role");
    }

    if (role !== current) {
        const { error } = await supabaseAdmin.auth.admin.updateUserById(
            user.id,
            {
                app_metadata: {
                    ...user.app_metadata,
                    role,
                },
            }
        )
        if (error) {
            throw new Error("Unable to update database");
        }
    } 
    return role;
}

function getUserNimFromEmail(email: string): string | null {
    const at = email.lastIndexOf("@");
    if (at < 1) return null;

    const nim = email.slice(0, at);
    const domain = email.slice(at + 1);

    const validDomain =
        domain === "itb.ac.id" || domain.endsWith(".itb.ac.id");

    if (validDomain && /^\d{8}$/.test(nim)) {
        return nim;
    }
    return null;
}