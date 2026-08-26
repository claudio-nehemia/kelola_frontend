"use client";

import { useGetAuditLogs } from "@/feature/owner/action/useGetAuditLogs";
import { TableAuditLogs } from "@/feature/owner/components/TableAuditLogs";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function OwnerAuditLogsPage() {
  const { data: logs = [], isLoading } = useGetAuditLogs();

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#150a3c] flex items-center gap-2">
          <ShieldCheck size={26} className="text-purple-600" />
          <span>Audit Trail & Jejak Aktivitas Sistem</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Catatan riwayat perubahan krusial, pembuatan akun Super Admin, dan tindakan keamanan platform.
        </p>
      </div>

      {/* Table */}
      <TableAuditLogs logs={logs} isLoading={isLoading} />
    </div>
  );
}
