"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogChangePassword } from "@/feature/_global/components/DialogChangePassword";
import { Footer } from "@/feature/_global/components/Footer";
import { useActionLogout } from "@/feature/auth/action/useActionLogout";
import { TextAlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpenDialogChangePassword, setIsOpenDialogChangePassword] =
    useState(false);

  const { mutate: actionLogout } = useActionLogout();

  return (
    <>
      <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-gray-50/30">
        <div className="flex flex-col w-full bg-[#041336]">
          <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
            <Link href="/dashboard">
              <Image
                src="/logoputihkelolatoko.png"
                alt="Logo Kelola Toko"
                width={160}
                height={100}
                className="object-contain"
              />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                <TextAlignJustify />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Pengaturan</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setIsOpenDialogChangePassword(true)}
                  >
                    Ubah Password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-red-500 hover:bg-red-600 font-bold text-white cursor-pointer focus:bg-red-600 focus:text-white"
                    onClick={() => actionLogout()}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">{children}</div>
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
