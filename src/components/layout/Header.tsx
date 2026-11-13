import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SideBar } from "./SideBar";
import type { Role } from "@/types/role";

export function Header({
  role,
  fotoProfil = "/dummy.svg",
}: {
  role: Role;
  fotoProfil?: string;
}) {
  return (
    <header className="sticky top-0 z-50 flex h-[83px] shrink-0 items-center justify-between bg-[#272C5B] px-[31px] text-white">
      <SideBar role={role} />

      <img
        src="/logoPutih.svg"
        alt="APATIS"
        className="absolute left-1/2 h-[42px] w-auto -translate-x-1/2"
      />
      <div className="flex items-center gap-8">
        <Link href="/HalamanNotifikasi">
          <img 
            src="/icon/Notif.svg" alt="Notifikasi" className="h-7 w-auto"
          />
        </Link>

        <Link href="/HalamanAkun">
          <Avatar className="size-10">
            <AvatarImage src={fotoProfil} alt="Profil" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}