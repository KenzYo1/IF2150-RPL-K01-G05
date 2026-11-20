import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PelaporSupabaseClient } from "@/repositories/pelaporRepository";
import {
    getMyPelaporProfileService,
    getPelaporByIdService,
    parseAndValidateIdPelapor,
    PelaporServiceError,
    resolvePelaporAuthContext,
} from "@/services/pelaporService";
import { isAllowedEmail } from "@/types/allowed-domains";
import { createMockSupabaseClient } from "./helpers/mockSupabase";

describe("Modul Autentikasi, Domain ITB & Resolusi Role (C19)", () => {
    it("isAllowedEmail menerima seluruh domain resmi ITB (case-insensitive) dan menolak domain eksternal/invalid", () => {
        assert.equal(isAllowedEmail("13525016@mahasiswa.itb.ac.id"), true);
        assert.equal(isAllowedEmail("13525016@std.stei.itb.ac.id"), true);
        assert.equal(isAllowedEmail("petugas@staff.itb.ac.id"), true);
        assert.equal(isAllowedEmail("admin@itb.ac.id"), true);
        assert.equal(isAllowedEmail("13525016@MAHASISWA.ITB.AC.ID"), true);

        assert.equal(isAllowedEmail("user@gmail.com"), false);
        assert.equal(isAllowedEmail("fake@itb.ac.id.evil.com"), false);
        assert.equal(isAllowedEmail(""), false);
        assert.equal(isAllowedEmail("tanpa-at-sign"), false);
    });

    it("resolvePelaporAuthContext menentukan role dari app_metadata, user_metadata, dan fallback domain email", async () => {
        const makeAuthClient = (user: {
            id: string;
            email?: string | null;
            app_metadata?: Record<string, unknown>;
            user_metadata?: Record<string, unknown>;
        } | null, error: { message: string } | null = null) =>
            ({
                ...createMockSupabaseClient(),
                auth: {
                    getUser: async () => ({
                        data: { user },
                        error,
                    }),
                },
            }) as unknown as PelaporSupabaseClient;

        const adminCtx = await resolvePelaporAuthContext(
            makeAuthClient({
                id: "auth-admin",
                email: "admin@itb.ac.id",
                app_metadata: { role: "admin" },
            })
        );
        assert.equal(adminCtx.role, "admin");

        const petugasByEmail = await resolvePelaporAuthContext(
            makeAuthClient({
                id: "auth-staff",
                email: "budi@staff.itb.ac.id",
            })
        );
        assert.equal(petugasByEmail.role, "petugas");

        const pelaporWithMeta = await resolvePelaporAuthContext(
            makeAuthClient({
                id: "auth-mhs",
                email: "13525016@mahasiswa.itb.ac.id",
                user_metadata: { role: "superuser", id_pelapor: 12 },
            })
        );
        // Role tak dikenal fallback aman ke "pelapor", idPelapor terbaca dari metadata
        assert.equal(pelaporWithMeta.role, "pelapor");
        assert.equal(pelaporWithMeta.idPelapor, 12);
    });

    it("resolvePelaporAuthContext menolak sesi tidak terautentikasi, client tanpa auth, atau error layanan Supabase (401)", async () => {
        const clientWithoutAuth =
            createMockSupabaseClient() as unknown as PelaporSupabaseClient;

        await assert.rejects(
            () => resolvePelaporAuthContext(clientWithoutAuth),
            (err: unknown) =>
                err instanceof PelaporServiceError &&
                err.code === "UNAUTHORIZED" &&
                err.statusCode === 401
        );

        const clientAuthError = {
            ...createMockSupabaseClient(),
            auth: {
                getUser: async () => ({
                    data: { user: null },
                    error: { message: "Auth timeout / token expired" },
                }),
            },
        } as unknown as PelaporSupabaseClient;

        await assert.rejects(
            () => resolvePelaporAuthContext(clientAuthError),
            (err: unknown) =>
                err instanceof PelaporServiceError &&
                err.code === "UNAUTHORIZED" &&
                err.statusCode === 401
        );
    });

    it("parseAndValidateIdPelapor, getMyPelaporProfileService, dan getPelaporByIdService menjaga privasi dan validasi sesi", async () => {
        assert.equal(parseAndValidateIdPelapor(" 7 "), 7);
        assert.throws(
            () => parseAndValidateIdPelapor("abc"),
            (err: unknown) =>
                err instanceof PelaporServiceError &&
                err.code === "INVALID_PELAPOR_ID" &&
                err.statusCode === 400
        );

        const mock = createMockSupabaseClient({
            pelapor: [
                {
                    id_pelapor: 7,
                    auth_user_id: "auth-7",
                    email: "13525016@mahasiswa.itb.ac.id",
                    nama_pelapor: "Kenzo",
                    nim_nip: "13525016",
                    poin: 15,
                },
            ],
        });
        const client = mock as unknown as PelaporSupabaseClient;

        const ownProfile = await getMyPelaporProfileService(client, {
            authUserId: "auth-7",
            idPelapor: null,
            email: "13525016@mahasiswa.itb.ac.id",
            role: "pelapor",
        });
        assert.equal(ownProfile.idPelapor, 7);

        // Pemilik akun melihat data lengkap (termasuk nimnipPelapor)
        const asOwner = await getPelaporByIdService(7, client, {
            authUserId: "auth-7",
            idPelapor: 7,
            role: "pelapor",
        });
        assert.ok("nimnipPelapor" in asOwner);

        // Pelapor lain hanya mendapat data publik (tanpa nimnipPelapor)
        const asOther = await getPelaporByIdService(7, client, {
            authUserId: "auth-99",
            idPelapor: 99,
            role: "pelapor",
        });
        assert.equal("nimnipPelapor" in asOther, false);
        assert.equal(asOther.namaPelapor, "Kenzo");

        // Profil tidak ditemukan -> 404
        await assert.rejects(
            () =>
                getPelaporByIdService(999, client, {
                    authUserId: "auth-7",
                    idPelapor: 7,
                    role: "admin",
                }),
            (err: unknown) =>
                err instanceof PelaporServiceError &&
                err.code === "PELAPOR_NOT_FOUND" &&
                err.statusCode === 404
        );
    });
});

