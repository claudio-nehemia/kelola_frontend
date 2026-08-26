"use client";

import { Button } from "@/components/ui/button";
import { DialogChangePassword } from "@/feature/_global/components/DialogChangePassword";
import { useActionLogout } from "@/feature/auth/action/useActionLogout";
import {
  BarChart3,
  Crown,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export default function OwnerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { mutate: actionLogout } = useActionLogout();
  const [isOpenPassword, setIsOpenPassword] = useState(false);

  const navLinks = [
    {
      href: "/owner/dashboard",
      label: "Executive Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/owner/reports",
      label: "Laporan Keuangan SaaS",
      icon: BarChart3,
    },
    {
      href: "/owner/admins",
      label: "Kelola Super Admin",
      icon: Users2,
    },
    {
      href: "/owner/audit-logs",
      label: "Audit Trail",
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-slate-100/70">
        {/* Owner Top Header */}
        <header className="w-full bg-[#150a3c] text-white shadow-lg sticky top-0 z-50 border-b border-purple-900/40">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
            {/* Logo & Executive Badge */}
            <div className="flex items-center gap-3">
              <Link href="/owner/dashboard" className="flex items-center gap-2">
                <Image
                  src="/logoputihkelolatoko.png"
                  alt="Kelola Toko Logo"
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </Link>
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                <Crown size={14} className="text-purple-950 fill-purple-950" />
                <span>Software Owner</span>
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
                        ? "bg-white/20 text-white shadow-inner font-bold border border-white/20"
                        : "text-purple-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/admin/dashboard"
                className="hidden lg:flex text-xs font-bold text-amber-300 hover:text-amber-200 bg-white/10 px-3 py-1.5 rounded border border-amber-300/30"
              >
                Lihat Panel Super Admin &rarr;
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpenPassword(true)}
                className="bg-transparent border-purple-800 text-white hover:bg-white/10 text-xs hidden sm:flex"
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

        {/* Mobile Navigation */}
        <div className="md:hidden bg-[#1f1057] text-white px-3 py-2 flex justify-around overflow-x-auto border-t border-purple-950">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-[11px] ${
                  isActive ? "text-amber-400 font-bold" : "text-purple-300"
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

        {/* Owner Footer */}
        <footer className="w-full bg-white border-t py-4 text-center text-xs text-gray-500">
          Kelola Toko &bull; Executive Software Owner Console &copy; 2026
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
