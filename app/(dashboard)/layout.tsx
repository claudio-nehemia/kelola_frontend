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
      <div className="flex flex-col w-full min-h-screen">
        <div className="flex flex-col w-full bg-[#041336]">
          <div className="flex h-15 items-center justify-around">
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
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Pengaturan</DropdownMenuLabel>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setIsOpenDialogChangePassword(true)}
                  >
                    Ubah Password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="bg-red-500 font-bold text-white cursor-pointer"
                    onClick={() => actionLogout()}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-1 p-6 md:p-10 md:px-17">{children}</div>
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
