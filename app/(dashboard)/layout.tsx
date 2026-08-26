"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogChangePassword } from "@/feature/_global/components/DialogChangePassword";
import { Footer } from "@/feature/_global/components/Footer";
import { useActionLogout } from "@/feature/auth/action/useActionLogout";
import {
  KeyRound,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  ReceiptText,
  TextAlignJustify,
  UserCog,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpenDialogChangePassword, setIsOpenDialogChangePassword] =
    useState(false);

  const pathname = usePathname();
  const { mutate: actionLogout } = useActionLogout();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/manage-product", label: "Kelola Produk", icon: PackageSearch },
    { href: "/detail-transaction", label: "Transaksi", icon: ReceiptText },
    { href: "/users", label: "Pengguna & Staf", icon: Users },
  ];

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-slate-50/50">
        {/* Navigation Bar */}
        <header className="w-full bg-[#041336] shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
            {/* Logo Brand */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logoputihkelolatoko.png"
                alt="Logo Kelola Toko"
                width={150}
                height={80}
                className="object-contain hover:opacity-95 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/15 text-white font-semibold shadow-inner"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile / Settings Menu */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      className="bg-transparent border-slate-600 text-white hover:bg-white/10 hover:text-white flex items-center gap-2 h-9 px-3"
                    />
                  }
                >
                  <TextAlignJustify size={18} />
                  <span className="hidden sm:inline text-xs font-semibold">
                    Menu
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                      Navigasi Cepat
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 w-full"
                      >
                        <LayoutDashboard size={15} />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href="/manage-product"
                        className="flex items-center gap-2 w-full"
                      >
                        <PackageSearch size={15} />
                        <span>Kelola Produk</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href="/detail-transaction"
                        className="flex items-center gap-2 w-full"
                      >
                        <ReceiptText size={15} />
                        <span>Detail Transaksi</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href="/users"
                        className="flex items-center gap-2 w-full"
                      >
                        <UserCog size={15} />
                        <span>Manajemen Pengguna</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
                      Akun & Keamanan
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => setIsOpenDialogChangePassword(true)}
                    >
                      <KeyRound size={15} />
                      <span>Ubah Password</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="bg-red-50 text-red-600 hover:bg-red-100 font-semibold cursor-pointer flex items-center gap-2 mt-1"
                      onClick={() => actionLogout()}
                    >
                      <LogOut size={15} />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {isOpenDialogChangePassword && (
        <DialogChangePassword
          isOpen={isOpenDialogChangePassword}
          setIsOpen={setIsOpenDialogChangePassword}
        />
      )}
    </>
  );
}

export default DashboardLayout;
