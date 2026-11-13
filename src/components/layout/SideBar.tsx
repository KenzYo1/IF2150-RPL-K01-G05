"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { Role } from "@/types/role";

const menuUser = [
  { href: "/HalamanAkun", label: "Profile", icon: "/icon/Profile.svg" },
  { href: "/laporan/baru", label: "Report", icon: "/icon/Lapor.svg" },
  { href: "/HalamanLeaderboard", label: "Leaderboard", icon: "/icon/Leaderboard.svg" },
];

const menuStaf = [
  ...menuUser,
  { href: "/tanggapan", label: "Response", icon: "/icon/Vector.svg" },
];

export function SideBar({ role = "pelapor" }: { role?: Role }) {
  const [open, setOpen] = useState(false);
  const menu = role === "pelapor" ? menuUser : menuStaf;

    useEffect(() => {
    if (!open) return;
    const lama = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = lama;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Buka menu"
        onClick={() => setOpen(!open)}
      >
        <Menu className="size-7" />
      </button>

      {open && (
        <>
          {/* Lapisan gelap: #626693, Multiply, mulai di bawah header (83px) */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[83px] z-40 bg-[#272C5B]/70"
          />

          {/* Panel sidebar: lebar 197, #485AB8 */}
          <nav className="fixed bottom-0 left-0 top-[83px] z-40 flex w-[210px] flex-col gap-[30px] bg-[#485AB8] px-[31px] pt-[25px] font-hywenhei text-white">
            {menu.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex h-[25px] items-center gap-4 text-[16px]"
              >
                <span className="flex h-[25px] w-[22px] items-center justify-start">
                  <img src={icon} alt="" className="max-h-full max-w-full" />
                </span>
                {label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </>
  );
}