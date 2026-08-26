"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useGetOwnerOverview } from "@/feature/owner/action/useGetOwnerOverview";
import { LeaderboardStoresCard } from "@/feature/owner/components/LeaderboardStoresCard";
import {
  ArrowUpRight,
  BarChart3,
  Coins,
  Crown,
  Layers,
  PieChart,
  ShieldCheck,
  ShoppingBag,
  Store,
  TrendingUp,
  Users2,
} from "lucide-react";
import Link from "next/link";

export default function OwnerDashboardPage() {
  const { data, isLoading } = useGetOwnerOverview();

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Memuat Executive Dashboard Software Owner...
      </div>
    );
  }

  const financials = data?.financials || {
    mrr: 0,
    arr: 0,
    monthlyContractRevenue: 0,
    yearlyContractRevenue: 0,
    totalContractRevenue: 0,
    monthlyPrice: 150000,
  };

  const stores = data?.stores || {
    totalStores: 0,
    activeStores: 0,
    warningH10Stores: 0,
    expiredStores: 0,
    terminatedStores: 0,
    draftStores: 0,
  };

  const ecosystem = data?.ecosystem || {
    ecosystemGmv: 0,
    totalProcessedTransactions: 0,
  };

  const topStores = data?.topStores || [];

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#150a3c] flex items-center gap-2">
            <Crown size={26} className="text-amber-500" />
            <span>Executive SaaS Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Pantauan makro performa bisnis SaaS, Monthly Recurring Revenue (MRR), dan perputaran GMV ekosistem toko retail.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/owner/reports">
            <Button className="bg-[#150a3c] hover:bg-[#25126a] text-white font-bold text-xs flex items-center gap-1.5 h-10 px-4 shadow-sm">
              <BarChart3 size={15} />
              <span>Laporan Lengkap SaaS</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Main Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <Card className="border shadow-sm bg-white border-l-4 border-l-purple-600">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-700">
              <Coins size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Monthly Recurring Revenue
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-purple-900 font-mono">
                {formatRupiah(financials.mrr)}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Est. ARR: <strong>{formatRupiah(financials.arr)}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Contract Revenue */}
        <Card className="border shadow-sm bg-white border-l-4 border-l-green-600">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-50 text-green-700">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Pendapatan Kontrak Masuk
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-green-700 font-mono">
                {formatRupiah(financials.totalContractRevenue)}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Bulan ini:{" "}
                <strong className="text-green-800">
                  {formatRupiah(financials.monthlyContractRevenue)}
                </strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ecosystem GMV */}
        <Card className="border shadow-sm bg-white border-l-4 border-l-blue-600">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Ecosystem GMV (Omset Retail)
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-blue-900 font-mono">
                {formatRupiah(ecosystem.ecosystemGmv)}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Diproses dari{" "}
                <strong>{ecosystem.totalProcessedTransactions} transaksi</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Store Scale */}
        <Card className="border shadow-sm bg-white border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
              <Store size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Toko Retail di Platform
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
                {stores.activeStores} Toko Aktif
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Total terdaftar: <strong>{stores.totalStores}</strong> (Draft:{" "}
                <strong>{stores.draftStores}</strong>)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Leaderboard & Platform Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top 5 Stores Leaderboard */}
        <div className="lg:col-span-2">
          <LeaderboardStoresCard stores={topStores} />
        </div>

        {/* Right Column: SaaS Store Status & Quick Links */}
        <div className="space-y-4">
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <PieChart size={16} className="text-purple-700" />
                Status Kesehatan Toko Klien
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  Toko Berlangganan Aktif:
                </span>
                <strong className="text-gray-900 font-bold font-mono">
                  {stores.activeStores} Toko
                </strong>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Hampir Habis Kontrak (H-10):
                </span>
                <strong className="text-amber-700 font-bold font-mono">
                  {stores.warningH10Stores} Toko
                </strong>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  Draft Akun (Belum Aktif):
                </span>
                <strong className="text-gray-700 font-bold font-mono">
                  {stores.draftStores} Toko
                </strong>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  Putus Kontrak / Kadaluarsa:
                </span>
                <strong className="text-red-700 font-bold font-mono">
                  {stores.terminatedStores + stores.expiredStores} Toko
                </strong>
              </div>

              <div className="pt-3 border-t flex justify-between items-center text-xs font-semibold text-gray-800">
                <span>Tarif Langganan per Bulan:</span>
                <span className="text-purple-800 font-bold">
                  {formatRupiah(financials.monthlyPrice)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Management Links */}
          <Card className="border shadow-sm bg-white">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-bold text-gray-900">
                Tata Kelola & Pengawasan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Link
                href="/owner/admins"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border text-xs font-semibold text-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Users2 size={16} className="text-blue-600" />
                  <span>Kelola Tim Super Admin</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-400" />
              </Link>

              <Link
                href="/owner/audit-logs"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border text-xs font-semibold text-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-purple-600" />
                  <span>Audit Trail & Aktivitas Sistem</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
