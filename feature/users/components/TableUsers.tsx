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
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Crown,
  Edit,
  Mail,
  Phone,
  Shield,
  ShoppingBag,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { UserItem } from "../models/userModel";
import { DialogEditUser } from "./DialogEditUser";
import { DialogDeleteUser } from "./DialogDeleteUser";

export function TableUsers({
  users,
  isLoading,
}: {
  users: UserItem[];
  isLoading: boolean;
}) {
  const [selectedUserForEdit, setSelectedUserForEdit] =
    useState<UserItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedUserForDelete, setSelectedUserForDelete] =
    useState<UserItem | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function getRoleBadge(role: string) {
    const formatted = (role || "").toLowerCase();
    if (formatted === "owner") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
          <Crown size={13} className="text-purple-600" />
          Owner
        </span>
      );
    }
    if (formatted === "admin") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <Shield size={13} className="text-blue-600" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <ShoppingBag size={13} className="text-emerald-600" />
        Kasir
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
              <TableHead>Nama Pengguna</TableHead>
              <TableHead>Role / Hak Akses</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Terdaftar</TableHead>
              <TableHead className="text-right pr-6">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={7} className="h-14 bg-slate-50/50" />
                  </TableRow>
                ))}
              </>
            )}

            {!isLoading && users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500 text-sm"
                >
                  Tidak ada data pengguna yang ditemukan.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              users.map((user, idx) => (
                <TableRow key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="text-center font-medium text-gray-500">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        @{user.username}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{getRoleBadge(user.role)}</TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-0.5 text-xs text-gray-600">
                      {user.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail size={12} className="text-gray-400" />
                          {user.email}
                        </span>
                      )}
                      {user.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone size={12} className="text-gray-400" />
                          {user.phone}
                        </span>
                      )}
                      {!user.email && !user.phone && (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {user.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <UserCheck size={12} />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        <UserX size={12} />
                        Nonaktif
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUserForEdit(user);
                          setIsEditOpen(true);
                        }}
                        className="h-8 px-2.5 hover:bg-slate-100 text-blue-600 border-blue-200"
                        title="Edit Pengguna"
                      >
                        <Edit size={14} />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUserForDelete(user);
                          setIsDeleteOpen(true);
                        }}
                        className="h-8 px-2.5 hover:bg-red-50 text-red-600 border-red-200"
                        title="Hapus Pengguna"
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

      {selectedUserForEdit && (
        <DialogEditUser
          user={selectedUserForEdit}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
      )}

      {selectedUserForDelete && (
        <DialogDeleteUser
          user={selectedUserForDelete}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
}
