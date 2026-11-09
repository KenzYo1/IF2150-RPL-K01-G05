import "server-only";
import { createClient  } from "./supabase/server";
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
    if (data.is_admin) {
        return "admin";
    }
    if ((String(data.nim_nip)).length == 18 || e.endsWith("@staff.itb.ac.id")) {
        return "petugas";
    }
    return "pelapor";
}