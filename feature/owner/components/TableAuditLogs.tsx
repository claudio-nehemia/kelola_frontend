"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldAlert } from "lucide-react";
import { IAuditLogItem } from "../models/ownerModel";

export function TableAuditLogs({
  logs,
  isLoading,
}: {
  logs: IAuditLogItem[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-12 text-center">No</TableHead>
            <TableHead>Waktu Kejadian</TableHead>
            <TableHead>Jenis Aksi</TableHead>
            <TableHead>Rincian Aktivitas</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={4} className="h-12 bg-slate-50/50" />
                </TableRow>
              ))}
            </>
          )}

          {!isLoading && logs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-500 text-xs"
              >
                Belum ada catatan aktivitas keamanan yang tercatat.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            logs.map((log, idx) => (
              <TableRow key={log.id} className="hover:bg-slate-50/80">
                <TableCell className="text-center font-medium text-gray-500 text-xs">
                  {idx + 1}
                </TableCell>

                <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border">
                    {log.action}
                  </span>
                </TableCell>

                <TableCell className="text-xs text-gray-800 font-medium">
                  {log.details || "-"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
