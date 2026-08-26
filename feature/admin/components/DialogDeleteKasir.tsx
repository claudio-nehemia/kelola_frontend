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
import { useActionDeleteKasir } from "../action/useActionDeleteKasir";
import { IKasirUser } from "../models/adminModel";

export function DialogDeleteKasir({
  kasir,
  isOpen,
  setIsOpen,
}: {
  kasir: IKasirUser | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteKasir, isPending } = useActionDeleteKasir();

  function handleConfirm() {
    if (!kasir) return;

    deleteKasir(kasir.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllKasir"] });
        queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
        toast.success(
          `Akun toko "${kasir.storeName || kasir.name}" (@${kasir.username}) berhasil dihapus!`,
        );
        setIsOpen(false);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message || "Gagal menghapus data kasir";
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
            Hapus Akun Toko & Kasir
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600 mt-1">
          Apakah Anda yakin ingin menghapus akun toko{" "}
          <strong className="text-gray-900">
            {kasir?.storeName || kasir?.name}
          </strong>{" "}
          (@{kasir?.username})? Tindakan ini akan menghapus akun kasir dari sistem secara permanen.
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
            {isPending ? "Menghapus..." : "Ya, Hapus Permanen"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
