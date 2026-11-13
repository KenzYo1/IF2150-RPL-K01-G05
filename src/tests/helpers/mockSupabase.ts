import type { LaporanRow } from "@/types/laporan";
import type { LikeRow } from "@/types/like";
import type { NotifikasiRow } from "@/types/notifikasi";
import type { PelaporRow } from "@/types/pelapor";

export interface MockDatabaseState {
    pelapor: PelaporRow[];
    laporan: LaporanRow[];
    likes: LikeRow[];
    notifikasi: NotifikasiRow[];
}

export function createMockSupabaseClient(initial?: Partial<MockDatabaseState>) {
    const state: MockDatabaseState = {
        pelapor: initial?.pelapor ? [...initial.pelapor] : [],
        laporan: initial?.laporan ? [...initial.laporan] : [],
        likes: initial?.likes ? [...initial.likes] : [],
        notifikasi: initial?.notifikasi ? [...initial.notifikasi] : [],
    };

    let nextLaporanId =
        state.laporan.reduce((m, r) => Math.max(m, Number(r.id_laporan) || 0), 0) + 1;
    let nextNotifId =
        state.notifikasi.reduce(
            (m, r) => Math.max(m, Number(r.id_notifikasi) || 0),
            0
        ) + 1;
    let nextLikeId =
        state.likes.reduce((m, r) => Math.max(m, Number(r.id_like) || 0), 0) + 1;

    function getTable(table: string): Record<string, unknown>[] {
        if (table === "pelapor") return state.pelapor as unknown as Record<string, unknown>[];
        if (table === "laporan") return state.laporan as unknown as Record<string, unknown>[];
        if (table === "likes") return state.likes as unknown as Record<string, unknown>[];
        if (table === "notifikasi")
            return state.notifikasi as unknown as Record<string, unknown>[];
        return [];
    }

    return {
        state,
        storage: {
            from: () => ({
                upload: async (path: string) => ({
                    data: { path },
                    error: null,
                }),
                getPublicUrl: (path: string) => ({
                    data: {
                        publicUrl: `https://example.supabase.co/storage/v1/object/public/laporan-foto/${path}`,
                    },
                }),
                remove: async (paths: string[]) => ({
                    data: paths.map((name) => ({ name })),
                    error: null,
                }),
            }),
        },
        from: (table: string) => {
            const rows = getTable(table);
            return {
                select: () => ({
                    eq: (col1: string, val1: unknown) => {
                        const filtered1 = rows.filter((r) => r[col1] === val1);
                        return {
                            maybeSingle: async () => ({
                                data: filtered1[0] ? { ...filtered1[0] } : null,
                                error: null,
                            }),
                            order: async (
                                orderCol: string,
                                opts?: { ascending?: boolean }
                            ) => {
                                const asc = opts?.ascending ?? true;
                                const sorted = [...filtered1].sort((a, b) => {
                                    const av = String(a[orderCol] ?? "");
                                    const bv = String(b[orderCol] ?? "");
                                    return asc
                                        ? av.localeCompare(bv)
                                        : bv.localeCompare(av);
                                });
                                return { data: sorted, error: null };
                            },
                            eq: (col2: string, val2: unknown) => {
                                const filtered2 = filtered1.filter(
                                    (r) => r[col2] === val2
                                );
                                return {
                                    maybeSingle: async () => ({
                                        data: filtered2[0]
                                            ? { ...filtered2[0] }
                                            : null,
                                        error: null,
                                    }),
                                };
                            },
                        };
                    },
                    order: async (
                        orderCol: string,
                        opts?: { ascending?: boolean }
                    ) => {
                        const asc = opts?.ascending ?? true;
                        const sorted = [...rows].sort((a, b) => {
                            const av = a[orderCol];
                            const bv = b[orderCol];
                            if (typeof av === "number" && typeof bv === "number") {
                                return asc ? av - bv : bv - av;
                            }
                            return asc
                                ? String(av ?? "").localeCompare(String(bv ?? ""))
                                : String(bv ?? "").localeCompare(String(av ?? ""));
                        });
                        return { data: sorted, error: null };
                    },
                }),
                insert: (payload: Record<string, unknown>) => ({
                    select: () => ({
                        single: async () => {
                            const now = new Date().toISOString();
                            const newRow: Record<string, unknown> = {
                                ...payload,
                                created_at: now,
                                updated_at: now,
                            };
                            if (table === "laporan") {
                                newRow.id_laporan = nextLaporanId++;
                                newRow.jumlah_like = newRow.jumlah_like ?? 0;
                                newRow.status_laporan =
                                    newRow.status_laporan ?? "Unverified";
                                state.laporan.push(
                                    newRow as unknown as LaporanRow
                                );
                            } else if (table === "notifikasi") {
                                newRow.id_notifikasi = nextNotifId++;
                                newRow.is_read = Boolean(
                                    newRow.is_read ?? newRow.status_baca ?? false
                                );
                                state.notifikasi.push(
                                    newRow as unknown as NotifikasiRow
                                );
                            } else if (table === "likes") {
                                newRow.id_like = nextLikeId++;
                                state.likes.push(newRow as unknown as LikeRow);
                            }
                            return { data: { ...newRow }, error: null };
                        },
                    }),
                }),
                update: (values: Record<string, unknown>) => ({
                    eq: (col: string, val: unknown) => {
                        const idx = rows.findIndex((r) => r[col] === val);
                        if (idx !== -1) {
                            rows[idx] = {
                                ...rows[idx],
                                ...values,
                                updated_at: new Date().toISOString(),
                            };
                        }
                        const updatedRow = idx !== -1 ? { ...rows[idx] } : null;
                        return {
                            select: () => ({
                                maybeSingle: async () => ({
                                    data: updatedRow,
                                    error: null,
                                }),
                                single: async () => ({
                                    data: updatedRow,
                                    error: null,
                                }),
                            }),
                        };
                    },
                }),
                delete: () => ({
                    eq: (col1: string, val1: unknown) => ({
                        eq: (col2: string, val2: unknown) => ({
                            select: async () => {
                                const removed: Record<string, unknown>[] = [];
                                for (let i = rows.length - 1; i >= 0; i--) {
                                    if (
                                        rows[i][col1] === val1 &&
                                        rows[i][col2] === val2
                                    ) {
                                        removed.push(rows[i]);
                                        rows.splice(i, 1);
                                    }
                                }
                                return { data: removed, error: null };
                            },
                        }),
                    }),
                }),
            };
        },
    };
}

