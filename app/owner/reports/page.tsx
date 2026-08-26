"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useGetOwnerReports } from "@/feature/owner/action/useGetOwnerReports";
import { TableFinancialReports } from "@/feature/owner/components/TableFinancialReports";
import {
  BarChart3,
  Calendar,
  FileSpreadsheet,
  Receipt,
  TrendingUp,
} from "lucide-react";

export default function OwnerReportsPage() {
  const { data, isLoading } = useGetOwnerReports();

  const monthlyBreakdown = data?.monthlyBreakdown || [];
  const recentContracts = data?.recentContracts || [];

  const totalAllRevenue = monthlyBreakdown.reduce(
    (sum, m) => sum + m.totalRevenue,
    0,
  );
  const totalContractCount = monthlyBreakdown.reduce(
    (sum, m) => sum + m.contractCount,
    0,
  );

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#150a3c] flex items-center gap-2">
          <BarChart3 size={26} className="text-purple-600" />
          <span>Laporan Keuangan SaaS & Rekapitulasi</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Rekapitulasi pendapatan uang masuk dari seluruh kontrak dan perpanjangan langganan toko retail.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-50 text-green-700">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Total Akumulasi Pendapatan Kontrak
              </p>
              <h3 className="text-xl font-bold text-green-700 font-mono">
                {formatRupiah(totalAllRevenue)}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-700">
              <Receipt size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Total Transaksi Kontrak Terbit
              </p>
              <h3 className="text-xl font-bold text-purple-950 font-mono">
                {totalContractCount} Transaksi
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
              <Calendar size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Periode Aktif Terdata
              </p>
              <h3 className="text-xl font-bold text-blue-950">
                {monthlyBreakdown.length} Bulan
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <FileSpreadsheet size={18} className="text-purple-600" />
          <span>Rekapitulasi Keuangan per Bulan</span>
        </h3>
        <TableFinancialReports data={monthlyBreakdown} isLoading={isLoading} />
      </div>
    </div>
  );
}
