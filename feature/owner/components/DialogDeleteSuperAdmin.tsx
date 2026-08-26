"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useActionDeleteSuperAdmin } from "../action/useActionDeleteSuperAdmin";
import { ISuperAdminItem } from "../models/ownerModel";

export function DialogDeleteSuperAdmin({
  admin,
  isOpen,
  setIsOpen,
}: {
  admin: ISuperAdminItem | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteAdmin, isPending } = useActionDeleteSuperAdmin();

  function handleConfirm() {
    if (!admin) return;

    deleteAdmin(admin.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getSuperAdmins"] });
        toast.success(`Akun Super Admin "${admin.name}" (@${admin.username}) berhasil dihapus!`);
        setIsOpen(false);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message || "Gagal menghapus akun super admin";
        toast.error(msg);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-2.5 text-red-600">
          <div className="p-2 rounded-full bg-red-100">
            <AlertTriangle size={22} />
          </div>
          <DialogTitle className="font-bold text-lg text-gray-900">
            Hapus Akun Super Admin
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600 mt-1">
          Apakah Anda yakin ingin menghapus akun Super Admin{" "}
          <strong className="text-gray-900">{admin?.name}</strong> (@{admin?.username})?
          Operator ini tidak akan dapat login lagi ke console Super Admin.
        </DialogDescription>

        <div className="flex justify-end gap-2 pt-3 border-t mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            Batal
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-5"
          >
            {isPending ? "Menghapus..." : "Ya, Hapus Super Admin"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
