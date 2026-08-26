"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOwners } from "../action/useGetAllOwners";
import { IOwnerUser } from "../models/adminModel";
import { Crown, Edit, Plus, Search, Trash2, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { DialogCreateOwner } from "./DialogCreateOwner";
import { DialogEditOwner } from "./DialogEditOwner";
import { DialogDeleteOwner } from "./DialogDeleteOwner";

export function DialogManageOwner() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState<IOwnerUser | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<IOwnerUser | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: owners = [], isLoading } = useGetAllOwners(search);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          render={
            <Button className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-4 py-5 flex items-center gap-2 shadow-sm" />
          }
        >
          <Crown size={18} className="text-amber-300" />
          <span>Atur Akun Owner</span>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2.5 text-purple-800">
              <div className="p-2 rounded-lg bg-purple-100">
                <Crown size={22} className="text-purple-700" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  Manajemen Akun Owner
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500">
                  Kelola data akun pemilik sistem (Owner) dan hak aksesnya.
                </DialogDescription>
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="bg-purple-700 hover:bg-purple-600 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>Tambah Owner</span>
            </Button>
          </div>

          {/* Search bar */}
          <div className="relative my-2">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau username owner..."
              className="pl-9 h-9 text-xs"
            />
          </div>

          {/* Table of Owners */}
          <div className="border rounded-lg overflow-hidden bg-white mt-1">
            <Table>
              <TableHeader className="bg-purple-50/50">
                <TableRow>
                  <TableHead className="w-10 text-center text-xs">No</TableHead>
                  <TableHead className="text-xs">Nama & Username</TableHead>
                  <TableHead className="text-xs">Kontak</TableHead>
                  <TableHead className="text-center text-xs">Status</TableHead>
                  <TableHead className="text-right pr-4 text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-xs text-gray-400">
                      Memuat daftar owner...
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && owners.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-xs text-gray-500">
                      Belum ada akun Owner yang terdaftar. Klik tombol &ldquo;Tambah Owner&rdquo; untuk membuat.
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading &&
                  owners.map((owner, idx) => (
                    <TableRow key={owner.id} className="hover:bg-slate-50">
                      <TableCell className="text-center text-xs text-gray-500">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-gray-900 flex items-center gap-1">
                            <Crown size={12} className="text-purple-600" />
                            {owner.name}
                          </span>
                          <span className="text-[11px] text-gray-500 font-mono">
                            @{owner.username}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs text-gray-600">
                        <div>{owner.phone || "-"}</div>
                        {owner.email && (
                          <div className="text-[11px] text-gray-400">{owner.email}</div>
                        )}
                      </TableCell>

                      <TableCell className="text-center">
                        {owner.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                            <UserCheck size={11} />
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                            <UserX size={11} />
                            Nonaktif
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-right pr-4">
                        <div className="flex justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedForEdit(owner);
                              setIsEditOpen(true);
                            }}
                            className="h-7 px-2 text-blue-600 hover:bg-blue-50 border-blue-200"
                            title="Edit Owner"
                          >
                            <Edit size={13} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedForDelete(owner);
                              setIsDeleteOpen(true);
                            }}
                            className="h-7 px-2 text-red-600 hover:bg-red-50 border-red-200"
                            title="Hapus Owner"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-modals for Create, Edit, Delete Owner */}
      <DialogCreateOwner
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      />

      {selectedForEdit && (
        <DialogEditOwner
          owner={selectedForEdit}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
      )}

      {selectedForDelete && (
        <DialogDeleteOwner
          owner={selectedForDelete}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
}
