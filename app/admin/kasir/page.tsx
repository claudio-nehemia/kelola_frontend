"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/feature/_global/utils/useDebounce";
import { useGetAllKasir } from "@/feature/admin/action/useGetAllKasir";
import { DialogCreateKasir } from "@/feature/admin/components/DialogCreateKasir";
import { TableKasir } from "@/feature/admin/components/TableKasir";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function KasirManagementContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";

  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
  }, [searchParams]);

  const debouncedSearch = useDebounce(searchValue, 300);

  const { data: kasirList = [], isLoading } = useGetAllKasir({
    search: debouncedSearch,
    status: selectedStatus === "all" ? undefined : selectedStatus,
  });

  const filterTabs = [
    { id: "all", label: "Semua Toko Kasir" },
    { id: "active", label: "Aktif" },
    { id: "warning_h10", label: "Hampir Habis (H-10)" },
    { id: "expired", label: "Kadaluarsa" },
    { id: "terminated", label: "Putus Kontrak" },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#041336]">
            Manajemen Toko & Admin Kasir
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Daftarkan kasir baru, perpanjang masa aktif langganan, dan putus kontrak toko retail.
          </p>
        </div>
        <DialogCreateKasir />
      </div>

      {/* Search & Filter Tab */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari nama toko, username, hp..."
            className="pl-9 h-10 border-gray-300"
          />
        </div>

        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedStatus === tab.id
                  ? "bg-[#041336] text-white shadow-sm"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <TableKasir kasirList={kasirList} isLoading={isLoading} />
    </div>
  );
}

export default function KasirManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-500">
          Memuat data manajemen kasir...
        </div>
      }
    >
      <KasirManagementContent />
    </Suspense>
  );
}
