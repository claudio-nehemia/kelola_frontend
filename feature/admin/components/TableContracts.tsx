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
import {
  ArrowDownLeft,
  CalendarCheck,
  CalendarPlus,
  PowerOff,
  Store,
} from "lucide-react";
import { IContractHistoryItem } from "../models/adminModel";

export function TableContracts({
  contracts,
  isLoading,
}: {
  contracts: IContractHistoryItem[];
  isLoading: boolean;
}) {
  function getTypeBadge(type: string) {
    if (type === "NEW_CONTRACT") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
          <CalendarPlus size={12} className="text-green-600" />
          Kontrak Baru
        </span>
      );
    }
    if (type === "RENEWAL") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <CalendarCheck size={12} className="text-blue-600" />
          Perpanjangan
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
        <PowerOff size={12} className="text-red-600" />
        Putus Kontrak
      </span>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Tanggal Transaksi</TableHead>
            <TableHead>Toko / Kasir</TableHead>
            <TableHead>Jenis Aksi</TableHead>
            <TableHead className="text-center">Durasi</TableHead>
            <TableHead className="text-right">Biaya Masuk (Rp)</TableHead>
            <TableHead>Periode Masa Aktif</TableHead>
            <TableHead>Catatan</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={8} className="h-14 bg-slate-50/50" />
                </TableRow>
              ))}
            </>
          )}

          {!isLoading && contracts.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-10 text-gray-500 text-sm"
              >
                Belum ada data riwayat kontrak.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            contracts.map((item, idx) => (
              <TableRow
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <TableCell className="text-center font-medium text-gray-500">
                  {idx + 1}
                </TableCell>

                <TableCell className="text-xs text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-xs flex items-center gap-1">
                      <Store size={12} className="text-blue-600" />
                      {item.user?.storeName || item.user?.name || "Toko"}
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono">
                      @{item.user?.username}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{getTypeBadge(item.type)}</TableCell>

                <TableCell className="text-center text-xs font-semibold text-gray-700">
                  {item.durationMonths > 0
                    ? `${item.durationMonths} Bulan`
                    : "-"}
                </TableCell>

                <TableCell className="text-right font-bold text-sm text-green-700">
                  {item.amountPaid > 0 ? (
                    <span className="inline-flex items-center gap-0.5">
                      <ArrowDownLeft size={14} className="text-green-600" />
                      {formatRupiah(item.amountPaid)}
                    </span>
                  ) : (
                    <span className="text-gray-400 font-normal">Rp 0</span>
                  )}
                </TableCell>

                <TableCell className="text-xs text-gray-600">
                  <span>
                    {new Date(item.startDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    s/d{" "}
                    {new Date(item.endDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </TableCell>

                <TableCell className="text-xs text-gray-500 max-w-[200px] truncate">
                  {item.notes || "-"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
