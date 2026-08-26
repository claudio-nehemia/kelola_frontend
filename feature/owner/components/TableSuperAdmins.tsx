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
  Edit,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { ISuperAdminItem } from "../models/ownerModel";
import { DialogEditSuperAdmin } from "./DialogEditSuperAdmin";
import { DialogDeleteSuperAdmin } from "./DialogDeleteSuperAdmin";

export function TableSuperAdmins({
  admins,
  isLoading,
}: {
  admins: ISuperAdminItem[];
  isLoading: boolean;
}) {
  const [selectedForEdit, setSelectedForEdit] =
    useState<ISuperAdminItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedForDelete, setSelectedForDelete] =
    useState<ISuperAdminItem | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Nama & Username</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead className="text-center">Status Akun</TableHead>
              <TableHead>Dibuat Pada</TableHead>
              <TableHead className="text-right pr-6">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={6} className="h-14 bg-slate-50/50" />
                  </TableRow>
                ))}
              </>
            )}

            {!isLoading && admins.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500 text-sm"
                >
                  Belum ada akun Super Admin yang terdaftar.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              admins.map((admin, idx) => (
                <TableRow
                  key={admin.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <TableCell className="text-center font-medium text-gray-500">
                    {idx + 1}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        <ShieldCheck size={15} className="text-blue-600" />
                        {admin.name}
                      </span>
                      <span className="text-xs text-gray-500 font-mono pl-5">
                        @{admin.username}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col text-xs text-gray-600">
                      {admin.phone ? (
                        <span className="inline-flex items-center gap-1 font-mono">
                          <Phone size={12} className="text-gray-400" />
                          {admin.phone}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                      {admin.email && (
                        <span className="text-gray-400 text-[11px] inline-flex items-center gap-1">
                          <Mail size={12} />
                          {admin.email}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {admin.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        <UserCheck size={12} />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                        <UserX size={12} />
                        Nonaktif
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-xs text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1.5 items-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedForEdit(admin);
                          setIsEditOpen(true);
                        }}
                        className="h-8 px-2.5 text-blue-600 hover:bg-blue-50 border-blue-200"
                        title="Edit Data Super Admin"
                      >
                        <Edit size={14} />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedForDelete(admin);
                          setIsDeleteOpen(true);
                        }}
                        className="h-8 px-2.5 text-red-600 hover:bg-red-50 border-red-200"
                        title="Hapus Super Admin"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {selectedForEdit && (
        <DialogEditSuperAdmin
          admin={selectedForEdit}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
      )}

      {selectedForDelete && (
        <DialogDeleteSuperAdmin
          admin={selectedForDelete}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
}
