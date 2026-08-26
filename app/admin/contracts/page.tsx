"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/feature/_global/utils/useDebounce";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useGetContracts } from "@/feature/admin/action/useGetContracts";
import { TableContracts } from "@/feature/admin/components/TableContracts";
import { Coins, History, Search } from "lucide-react";
import { Suspense, useState } from "react";

function ContractsContent() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading } = useGetContracts({
    search: debouncedSearch,
    type: selectedType === "all" ? undefined : selectedType,
  });

  const contracts = data?.data || [];
  const totalRevenue = data?.totalRevenue || 0;
  const totalContracts = data?.totalContracts || 0;

  const typeFilterTabs = [
    { id: "all", label: "Semua Transaksi" },
    { id: "NEW_CONTRACT", label: "Kontrak Baru" },
    { id: "RENEWAL", label: "Perpanjangan" },
    { id: "TERMINATED", label: "Putus Kontrak" },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#041336]">
          Riwayat Kontrak & Uang Masuk
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Catatan lengkap seluruh transaksi pendaftaran, perpanjangan, dan pemutusan kontrak toko retail.
        </p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-green-50 text-green-700">
              <Coins size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">
                Total Biaya Kontrak Masuk
              </p>
              <h3 className="text-xl font-extrabold text-green-700">
                {isLoading ? "..." : formatRupiah(totalRevenue)}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700">
              <History size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">
                Total Aksi Kontrak
              </p>
              <h3 className="text-xl font-extrabold text-gray-900">
                {isLoading ? "..." : totalContracts} Transaksi
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Type Filter Tab */}
      <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari toko atau username kasir..."
            className="pl-9 h-10 border-gray-300"
          />
        </div>

        <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {typeFilterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                selectedType === tab.id
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
      <TableContracts contracts={contracts} isLoading={isLoading} />
    </div>
  );
}

export default function ContractsHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-500">
          Memuat riwayat kontrak...
        </div>
      }
    >
      <ContractsContent />
    </Suspense>
  );
}
