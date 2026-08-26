"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/feature/_global/utils/useDebounce";
import { useGetSuperAdmins } from "@/feature/owner/action/useGetSuperAdmins";
import { DialogCreateSuperAdmin } from "@/feature/owner/components/DialogCreateSuperAdmin";
import { TableSuperAdmins } from "@/feature/owner/components/TableSuperAdmins";
import { Search, Users2 } from "lucide-react";
import { useState } from "react";

export default function OwnerAdminsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: admins = [], isLoading } = useGetSuperAdmins(debouncedSearch);

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#150a3c] flex items-center gap-2">
            <Users2 size={26} className="text-blue-600" />
            <span>Manajemen Akun Super Admin</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Kelola operator teknis platform yang bertugas melayani pendaftaran kasir, perpanjangan, dan kontrak toko retail.
          </p>
        </div>

        <DialogCreateSuperAdmin />
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau username Super Admin..."
            className="pl-9 h-9 border-gray-300"
          />
        </div>
      </div>

      {/* Table */}
      <TableSuperAdmins admins={admins} isLoading={isLoading} />
    </div>
  );
}
