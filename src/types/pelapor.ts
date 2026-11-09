import type { Role } from "@/types/role";

export interface AuthenticatedUserContext {
    authUserId: string;
    idPelapor?: number | null;
    role: Role;
}

export interface PelaporRow {
    id_pelapor: number;
    auth_user_id?: string | null;
    nama_pelapor: string;
    nim_nip: string;
    poin: number | null;
    created_at?: string | null;
    updated_at?: string | null;
}

export interface PelaporEntity {
    idPelapor: number;
    authUserId: string | null;
    namaPelapor: string;
    nimnipPelapor: string;
    poinPelapor: number;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface PublicPelaporData {
    idPelapor: number;
    namaPelapor: string;
    poinPelapor: number;
}

export interface NewPelaporInput {
    idPelapor?: number;
    authUserId?: string | null;
    namaPelapor: string;
    nimnipPelapor: string;
    poinPelapor?: number;
}

export interface UpdatePelaporInput {
    namaPelapor?: string;
    nimnipPelapor?: string;
    poinPelapor?: number;
}