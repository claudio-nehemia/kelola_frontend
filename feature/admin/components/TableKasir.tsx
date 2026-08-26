"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  CalendarCheck2,
  CalendarClock,
  Edit,
  Eye,
  Phone,
  PowerOff,
  Store,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IKasirUser } from "../models/adminModel";
import { DialogExtendContract } from "./DialogExtendContract";
import { DialogTerminateContract } from "./DialogTerminateContract";
import { DialogEditKasir } from "./DialogEditKasir";
import { DialogDeleteKasir } from "./DialogDeleteKasir";

export function TableKasir({
  kasirList,
  isLoading,
}: {
  kasirList: IKasirUser[];
  isLoading: boolean;
}) {
  const [selectedForExtend, setSelectedForExtend] = useState<IKasirUser | null>(
    null,
  );
  const [isExtendOpen, setIsExtendOpen] = useState(false);

  const [selectedForTerminate, setSelectedForTerminate] =
    useState<IKasirUser | null>(null);
  const [isTerminateOpen, setIsTerminateOpen] = useState(false);

  const [selectedForEdit, setSelectedForEdit] = useState<IKasirUser | null>(
    null,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedForDelete, setSelectedForDelete] = useState<IKasirUser | null>(
    null,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function getStatusBadge(kasir: IKasirUser) {
    if (kasir.contractStatus === "terminated" || !kasir.isActive) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
          <PowerOff size={12} className="text-gray-500" />
          Putus Kontrak
        </span>
      );
    }
    if (kasir.contractStatus === "expired") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
          <AlertTriangle size={12} className="text-red-600" />
          Kadaluarsa (0 Hari)
        </span>
      );
    }
    if (kasir.contractStatus === "warning_h10") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
          <AlertTriangle size={12} className="text-amber-600" />
          H-{kasir.daysRemaining} Hari (Segera Habis)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
        <CalendarCheck2 size={12} className="text-green-600" />
        Aktif ({kasir.daysRemaining} Hari)
      </span>
    );
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Nama Toko & Kasir</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Masa Aktif Kontrak</TableHead>
              <TableHead className="text-center">Status Masa Aktif</TableHead>
              <TableHead className="text-center">Data Toko</TableHead>
              <TableHead className="text-right pr-6">Aksi & Kontrak</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={7} className="h-16 bg-slate-50/50" />
                  </TableRow>
                ))}
              </>
            )}

            {!isLoading && kasirList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500 text-sm"
                >
                  Belum ada akun Admin Kasir yang terdaftar.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              kasirList.map((kasir, idx) => (
                <TableRow
                  key={kasir.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <TableCell className="text-center font-medium text-gray-500">
                    {idx + 1}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        <Store size={14} className="text-blue-600" />
                        {kasir.storeName || kasir.name}
                      </span>
                      <span className="text-xs text-gray-500 font-mono pl-5">
                        @{kasir.username} ({kasir.name})
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col text-xs text-gray-600">
                      {kasir.phone ? (
                        <span className="inline-flex items-center gap-1 font-mono">
                          <Phone size={12} className="text-gray-400" />
                          {kasir.phone}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                      {kasir.email && (
                        <span className="text-gray-400 text-[11px]">
                          {kasir.email}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col text-xs text-gray-700">
                      {kasir.contractEnd ? (
                        <>
                          <span>
                            s/d{" "}
                            <strong>
                              {new Date(kasir.contractEnd).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </strong>
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">Belum diatur</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {getStatusBadge(kasir)}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="inline-flex gap-1.5 text-[11px] font-medium text-gray-600">
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded">
                        {kasir._count?.products || 0} Produk
                      </span>
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded">
                        {kasir._count?.transactions || 0} Trx
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1.5 items-center">
                      {/* Tombol Perpanjang */}
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedForExtend(kasir);
                          setIsExtendOpen(true);
                        }}
                        className="h-8 px-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1"
                        title="Perpanjang Masa Aktif Kontrak"
                      >
                        <CalendarClock size={13} />
                        <span>Perpanjang</span>
                      </Button>

                      {/* Tombol Putus Kontrak */}
                      {kasir.isActive && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedForTerminate(kasir);
                            setIsTerminateOpen(true);
                          }}
                          className="h-8 px-2 text-red-600 hover:bg-red-50 border-red-200"
                          title="Putus Kontrak"
                        >
                          <PowerOff size={13} />
                        </Button>
                      )}

                      {/* Tombol Edit Profil Kasir */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedForEdit(kasir);
                          setIsEditOpen(true);
                        }}
                        className="h-8 px-2 text-amber-600 hover:bg-amber-50 border-amber-300"
                        title="Edit Data Toko & Kasir"
                      >
                        <Edit size={13} />
                      </Button>

                      {/* Tombol Hapus Kasir */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedForDelete(kasir);
                          setIsDeleteOpen(true);
                        }}
                        className="h-8 px-2 text-red-600 hover:bg-red-50 border-red-200"
                        title="Hapus Akun Kasir"
                      >
                        <Trash2 size={13} />
                      </Button>

                      {/* Tombol Pantau Toko */}
                      <Link href={`/admin/kasir/${kasir.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2 text-gray-700 hover:bg-slate-100 border-slate-300"
                          title="Pantau Produk & Transaksi Kasir Ini"
                        >
                          <Eye size={13} />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {selectedForExtend && (
        <DialogExtendContract
          kasir={selectedForExtend}
          isOpen={isExtendOpen}
          setIsOpen={setIsExtendOpen}
        />
      )}

      {selectedForTerminate && (
        <DialogTerminateContract
          kasir={selectedForTerminate}
          isOpen={isTerminateOpen}
          setIsOpen={setIsTerminateOpen}
        />
      )}

      {selectedForEdit && (
        <DialogEditKasir
          kasir={selectedForEdit}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
      )}

      {selectedForDelete && (
        <DialogDeleteKasir
          kasir={selectedForDelete}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
}
