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
import { useActionDeleteUser } from "../action/useActionDeleteUser";
import { UserItem } from "../models/userModel";

export function DialogDeleteUser({
  user,
  isOpen,
  setIsOpen,
}: {
  user: UserItem | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending } = useActionDeleteUser();

  function handleConfirmDelete() {
    if (!user) return;
    deleteUser(user.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
        toast.success(`Pengguna "${user.name}" berhasil dihapus!`);
        setIsOpen(false);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message || "Gagal menghapus data pengguna";
        toast.error(msg);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-3 text-red-600">
          <div className="bg-red-100 p-2.5 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <DialogTitle className="font-bold text-lg text-gray-900">
            Hapus Pengguna
          </DialogTitle>
        </div>

        <DialogDescription className="text-sm text-gray-600 mt-2">
          Apakah Anda yakin ingin menghapus akun pengguna{" "}
          <strong className="text-gray-900">{user?.name}</strong> (@{user?.username})?
          Tindakan ini tidak dapat dibatalkan.
        </DialogDescription>

        <div className="flex justify-end gap-2 pt-4 border-t mt-4">
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
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-5"
          >
            {isPending ? "Menghapus..." : "Ya, Hapus Pengguna"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
