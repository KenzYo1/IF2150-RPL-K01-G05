import type { FotoUploadFileInput } from "@/types/laporan";

export const DEFAULT_LAPORAN_STORAGE_BUCKET = "laporan-foto";

export const MAX_FOTO_SIZE_MB = 10;
export const MAX_FOTO_SIZE_BYTES = MAX_FOTO_SIZE_MB * 1024 * 1024;

export const ALLOWED_FOTO_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
] as const;

export const ALLOWED_FOTO_EXTENSIONS = [".jpg", ".jpeg", ".png"] as const;

export function getLaporanStorageBucket(bucketOverride?: string): string {
    const trimmedOverride = bucketOverride?.trim();
    if (trimmedOverride) {
        return trimmedOverride;
    }

    const envBucket =
        process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() ||
        process.env.SUPABASE_STORAGE_BUCKET?.trim();

    return envBucket || DEFAULT_LAPORAN_STORAGE_BUCKET;
}

export function resolveFotoExtension(
    fileName: string,
    mimeType: string
): "jpg" | "png" {
    const normalizedMime = mimeType.trim().toLowerCase();
    if (normalizedMime === "image/png") {
        return "png";
    }
    if (normalizedMime === "image/jpeg" || normalizedMime === "image/jpg") {
        return "jpg";
    }

    const lowerName = fileName.trim().toLowerCase();
    if (lowerName.endsWith(".png")) {
        return "png";
    }

    return "jpg";
}

export function normalizeFotoContentType(
    mimeType: string,
    fileName = ""
): "image/jpeg" | "image/png" {
    const ext = resolveFotoExtension(fileName, mimeType);
    return ext === "png" ? "image/png" : "image/jpeg";
}

export function buildLaporanFotoStoragePath(
    fileName: string,
    mimeType: string,
    idPelapor?: number | null
): string {
    const ext = resolveFotoExtension(fileName, mimeType);
    const folder =
        typeof idPelapor === "number" &&
        Number.isInteger(idPelapor) &&
        idPelapor > 0
            ? `pelapor-${idPelapor}`
            : "pelapor-umum";

    const uniqueId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`;

    return `laporan/${folder}/${Date.now()}-${uniqueId}.${ext}`;
}

export function extractStoragePathFromUrlOrPath(
    pathOrUrl: string,
    bucket = getLaporanStorageBucket()
): string {
    const trimmed = pathOrUrl.trim();
    if (!trimmed) {
        return "";
    }

    const publicPrefix = `/storage/v1/object/public/${bucket}/`;
    const publicIdx = trimmed.indexOf(publicPrefix);
    if (publicIdx !== -1) {
        return decodeURIComponent(
            trimmed.slice(publicIdx + publicPrefix.length)
        );
    }

    const authenticatedPrefix = `/storage/v1/object/authenticated/${bucket}/`;
    const authIdx = trimmed.indexOf(authenticatedPrefix);
    if (authIdx !== -1) {
        return decodeURIComponent(
            trimmed.slice(authIdx + authenticatedPrefix.length)
        );
    }

    return trimmed.replace(/^\/+/, "");
}

export async function fileToFotoUploadInput(
    file: File | FotoUploadFileInput
): Promise<FotoUploadFileInput> {
    if ("buffer" in file && "fileName" in file && "mimeType" in file) {
        return file;
    }

    const arrayBuffer = await file.arrayBuffer();
    return {
        buffer: new Uint8Array(arrayBuffer),
        fileName: file.name || "foto-laporan.jpg",
        mimeType: file.type || "",
        size: file.size,
    };
}

