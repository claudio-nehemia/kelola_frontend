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
import { useActionDeleteOwner } from "../action/useActionDeleteOwner";
import { IOwnerUser } from "../models/adminModel";

export function DialogDeleteOwner({
  owner,
  isOpen,
  setIsOpen,
}: {
  owner: IOwnerUser | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteOwner, isPending } = useActionDeleteOwner();

  function handleConfirm() {
    if (!owner) return;

    deleteOwner(owner.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllOwners"] });
        toast.success(`Akun owner "${owner.name}" (@${owner.username}) berhasil dihapus!`);
        setIsOpen(false);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Gagal menghapus akun owner";
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
            Hapus Akun Owner
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600 mt-1">
          Apakah Anda yakin ingin menghapus akun owner{" "}
          <strong className="text-gray-900">{owner?.name}</strong> (@{owner?.username})? Tindakan ini tidak dapat dibatalkan.
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
            {isPending ? "Menghapus..." : "Ya, Hapus Akun Owner"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
