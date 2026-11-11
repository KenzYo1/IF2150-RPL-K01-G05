export const ALLOWED_DOMAINS = [
    "staff.itb.ac.id",
    "itb.ac.id",
    "std.stei.itb.ac.id",
    "mahasiswa.itb.ac.id",
];

export function isAllowedEmail(email: string): boolean {
    const domain = email.toLowerCase().split("@").at(-1);
    return ALLOWED_DOMAINS.includes(domain as typeof ALLOWED_DOMAINS[number]);
}