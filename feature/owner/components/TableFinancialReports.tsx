"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { ArrowDownLeft, Calendar } from "lucide-react";
import { IMonthlyFinancialBreakdown } from "../models/ownerModel";

export function TableFinancialReports({
  data,
  isLoading,
}: {
  data: IMonthlyFinancialBreakdown[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden max-w-2xl">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Periode Bulan</TableHead>
            <TableHead className="text-center">Jumlah Transaksi Kontrak</TableHead>
            <TableHead className="text-right pr-6">Total Pendapatan (Rp)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={4} className="h-12 bg-slate-50/50" />
                </TableRow>
              ))}
            </>
          )}

          {!isLoading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-gray-500 text-xs"
              >
                Belum ada data pendapatan bulanan yang tercatat.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            data.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-slate-50/80">
                <TableCell className="text-center font-medium text-gray-500 text-xs">
                  {idx + 1}
                </TableCell>

                <TableCell className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                  <Calendar size={13} className="text-purple-600" />
                  {item.month}
                </TableCell>

                <TableCell className="text-center text-xs font-medium text-gray-700">
                  {item.contractCount} Transaksi
                </TableCell>

                <TableCell className="text-right font-extrabold text-sm text-green-700 font-mono pr-6">
                  <span className="inline-flex items-center gap-1">
                    <ArrowDownLeft size={14} className="text-green-600" />
                    {formatRupiah(item.totalRevenue)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
