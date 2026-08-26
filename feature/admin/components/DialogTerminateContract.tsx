"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { Ban, PowerOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActionTerminateContract } from "../action/useActionTerminateContract";
import { IKasirUser } from "../models/adminModel";

export function DialogTerminateContract({
  kasir,
  isOpen,
  setIsOpen,
}: {
  kasir: IKasirUser | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();
  const { mutate: terminateContract, isPending } = useActionTerminateContract({
    userId: kasir?.id || "",
  });

  function handleConfirm() {
    if (!kasir) return;

    terminateContract(
      { notes: notes || "Kontrak diputus oleh Super Admin" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllKasir"] });
          queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
          queryClient.invalidateQueries({ queryKey: ["getContracts"] });
          toast.success(
            `Kontrak toko "${kasir.storeName || kasir.name}" telah diputus. Akun kasir dinonaktifkan.`,
          );
          setNotes("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal memutus kontrak kasir";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-2.5 text-red-600">
          <div className="p-2 rounded-full bg-red-100">
            <PowerOff size={22} />
          </div>
          <DialogTitle className="font-bold text-lg text-gray-900">
            Putus Kontrak / Nonaktifkan Toko
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600 mt-1">
          Tindakan ini akan <strong>menonaktifkan akun kasir segera</strong>. Kasir tidak akan dapat login ke sistem POS sampai kontrak diaktifkan kembali.
        </DialogDescription>

        <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-xs space-y-1 my-2">
          <p>
            <span className="text-gray-600">Toko:</span>{" "}
            <strong className="text-gray-900">{kasir?.storeName || kasir?.name}</strong>
          </p>
          <p>
            <span className="text-gray-600">Username:</span>{" "}
            <span className="font-mono">@{kasir?.username}</span>
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">
            Alasan Pemutusan Kontrak (Opsional)
          </label>
          <Input
            placeholder="cth: Pelanggaran ketentuan atau permintaan pemilik toko"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

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
            {isPending ? "Memproses..." : "Ya, Putus Kontrak Sekarang"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
