import "server-only";
import type { User } from "@supabase/supabase-js";
import { createClient  } from "./supabase/server";
import { supabaseAdmin } from "./supabase/admin";
import { Role } from "@/types/role"

export async function getRole(email: string): Promise<Role | null> {
    const e = email.toLowerCase();
    
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("pelapor")
        .select("nim_nip, is_admin")
        .eq("email", e)
        .maybeSingle();
    if (error) {
        throw new Error("Fetching from database failed")
    }
    if (!data) {
        return null;
    }

    // Note admin gak bisa ditentuin dari email, security reasons

    if ((String(data.nim_nip)).length == 18 || e.endsWith("@staff.itb.ac.id")) {
        return "petugas";
    }
    return "pelapor";
}

// this one uhh resolves it generally
export async function resolveRole(user: User): Promise<Role> {
    const r = user.app_metadata.role;
    if (r) {
        return r as Role;
    }
    if (!user.email) {
        throw new Error("User has no email");
    }
    const role = await getRole(user.email);
    if (!role) {
        throw new Error("Unable to determine user role");
    }

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
    return role;
}
