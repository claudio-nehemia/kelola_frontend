"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useGetAdminStats } from "@/feature/admin/action/useGetAdminStats";
import { DialogCreateKasir } from "@/feature/admin/components/DialogCreateKasir";
import { DialogExtendContract } from "@/feature/admin/components/DialogExtendContract";
import { IKasirUser } from "@/feature/admin/models/adminModel";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Coins,
  History,
  PowerOff,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useGetAdminStats();
  const [selectedForExtend, setSelectedForExtend] = useState<IKasirUser | null>(
    null,
  );
  const [isExtendOpen, setIsExtendOpen] = useState(false);

  return (
    <div className="space-y-6 w-full">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#041336]">
            Dashboard Super Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Pusat pemantauan platform toko retail, masa aktif kontrak kasir, dan pendapatan langganan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DialogCreateKasir />
        </div>
      </div>

      {/* Revenue & Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
              <Store size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Total Toko Kasir</p>
              <h3 className="text-2xl font-extrabold text-gray-900">
                {isLoading ? "..." : stats?.totalKasir || 0}
              </h3>
              <p className="text-[11px] text-green-600 font-medium">
                {stats?.activeCount || 0} Toko Aktif
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Segera Habis (H-10)
              </p>
              <h3 className="text-2xl font-extrabold text-amber-600">
                {isLoading ? "..." : stats?.warningH10Count || 0}
              </h3>
              <p className="text-[11px] text-amber-700 font-medium">
                Perlu Perpanjangan
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-50 text-green-700">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Pendapatan Bulan Ini
              </p>
              <h3 className="text-xl font-extrabold text-green-700">
                {isLoading ? "..." : formatRupiah(stats?.monthlyRevenue || 0)}
              </h3>
              <p className="text-[11px] text-gray-500">Biaya Kontrak Masuk</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-700">
              <Coins size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Total Omset Kontrak
              </p>
              <h3 className="text-xl font-extrabold text-purple-800">
                {isLoading ? "..." : formatRupiah(stats?.totalRevenue || 0)}
              </h3>
              <p className="text-[11px] text-gray-500">Akumulasi Semua Kontrak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning H-10 Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle size={18} />
                <CardTitle className="text-base font-bold text-gray-900">
                  Toko Hampir Habis Kontrak (H-10)
                </CardTitle>
              </div>
              <Link
                href="/admin/kasir?status=warning_h10"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </CardHeader>

            <CardContent className="p-4">
              {isLoading && (
                <p className="text-xs text-gray-400 py-4 text-center">
                  Memuat data peringatan kontrak...
                </p>
              )}

              {!isLoading &&
                (!stats?.warningKasirList ||
                  stats.warningKasirList.length === 0) && (
                  <div className="text-center py-8 text-gray-500 text-xs">
                    <CheckCircle2
                      size={28}
                      className="mx-auto text-green-500 mb-2"
                    />
                    <p className="font-semibold text-gray-800">
                      Semua kontrak toko dalam kondisi aman!
                    </p>
                    <p className="text-gray-400 mt-0.5">
                      Tidak ada akun kasir dengan sisa masa aktif &le; 10 hari.
                    </p>
                  </div>
                )}

              {!isLoading &&
                stats?.warningKasirList &&
                stats.warningKasirList.map((kasir) => (
                  <div
                    key={kasir.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 mb-2 rounded-lg bg-amber-50/70 border border-amber-200 gap-2"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                        <Store size={14} className="text-amber-700" />
                        {kasir.storeName || kasir.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Username:{" "}
                        <strong className="font-mono text-gray-800">
                          @{kasir.username}
                        </strong>{" "}
                        &bull; Berakhir:{" "}
                        {kasir.contractEnd
                          ? new Date(kasir.contractEnd).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "-"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-900 animate-pulse">
                        Tersisa {kasir.daysRemaining} Hari
                      </span>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedForExtend(kasir);
                          setIsExtendOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold h-8"
                      >
                        <CalendarClock size={13} className="mr-1" />
                        Perpanjang
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Links & Shortcuts */}
        <div className="space-y-4">
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-bold text-gray-900">
                Menu & Navigasi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Link
                href="/admin/kasir"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border text-xs font-semibold text-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Store size={16} className="text-blue-600" />
                  <span>Daftar Semua Kasir</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-400" />
              </Link>

              <Link
                href="/admin/contracts"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border text-xs font-semibold text-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <History size={16} className="text-purple-600" />
                  <span>Riwayat Transaksi Kontrak</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-400" />
              </Link>

              <Link
                href="/admin/pricing"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border text-xs font-semibold text-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Coins size={16} className="text-green-600" />
                  <span>Atur Biaya Paket Langganan</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedForExtend && (
        <DialogExtendContract
          kasir={selectedForExtend}
          isOpen={isExtendOpen}
          setIsOpen={setIsExtendOpen}
        />
      )}
    </div>
  );
}
