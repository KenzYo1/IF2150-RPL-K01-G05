import { Role } from "./role";

export const ROUTE_ROLES : Record<string, Role[]> = {
    "/HalamanAkun": ["petugas", "pelapor", "admin"],
    "/HalamanLaporan": ["petugas", "pelapor", "admin"],
    "/HalamanFormulirLaporan": ["pelapor"],
    "/HalamanTanggapanLaporan": ["petugas", "admin"],
    "/HalamanLeaderboard": ["petugas", "pelapor", "admin"],
    "/HalamanNotifikasi": ["pelapor"],
}
