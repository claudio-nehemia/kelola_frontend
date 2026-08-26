"use client";

import { Button } from "@/components/ui/button";
import { DialogChangePassword } from "@/feature/_global/components/DialogChangePassword";
import { useActionLogout } from "@/feature/auth/action/useActionLogout";
import {
  Coins,
  History,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { mutate: actionLogout } = useActionLogout();
  const [isOpenPassword, setIsOpenPassword] = useState(false);

  const navLinks = [
    {
      href: "/admin/dashboard",
      label: "Dashboard Platform",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/kasir",
      label: "Manajemen Toko & Kasir",
      icon: Store,
    },
    {
      href: "/admin/contracts",
      label: "Riwayat Kontrak",
      icon: History,
    },
    {
      href: "/admin/pricing",
      label: "Pengaturan Tarif",
      icon: Coins,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-slate-100/70">
        {/* Super Admin Top Header */}
        <header className="w-full bg-[#041336] text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
            {/* Logo & Role Badge */}
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Image
                  src="/logoputihkelolatoko.png"
                  alt="Kelola Toko Logo"
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </Link>
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-400 text-gray-900 font-extrabold text-[11px] uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Super Admin</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-white/20 text-white shadow-inner font-bold"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Action */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpenPassword(true)}
                className="bg-transparent border-slate-600 text-white hover:bg-white/10 text-xs hidden sm:flex"
              >
                Ubah Password
              </Button>
              <Button
                size="sm"
                onClick={() => actionLogout()}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <LogOut size={14} />
                <span>Keluar</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation bar */}
        <div className="md:hidden bg-slate-900 text-white px-3 py-2 flex justify-around overflow-x-auto border-t border-slate-800">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-[11px] ${
                  isActive ? "text-amber-400 font-bold" : "text-gray-400"
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Content View */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8">
          {children}
        </main>

        {/* Super Admin Footer */}
        <footer className="w-full bg-white border-t py-4 text-center text-xs text-gray-500">
          Super Admin Management Console &bull; Kelola Toko &copy; 2026
        </footer>
      </div>

      {isOpenPassword && (
        <DialogChangePassword
          isOpen={isOpenPassword}
          setIsOpen={setIsOpenPassword}
        />
      )}
    </>
  );
}
