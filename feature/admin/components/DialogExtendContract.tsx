"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarClock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActionExtendContract } from "../action/useActionExtendContract";
import { useGetPricing } from "../action/useGetPricing";
import { IKasirUser } from "../models/adminModel";

export function DialogExtendContract({
  kasir,
  isOpen,
  setIsOpen,
}: {
  kasir: IKasirUser | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [durationMonths, setDurationMonths] = useState("1");
  const [notes, setNotes] = useState("");

  const queryClient = useQueryClient();
  const { data: pricing } = useGetPricing();
  const { mutate: extendContract, isPending } = useActionExtendContract({
    userId: kasir?.id || "",
  });

  const monthlyPrice = pricing?.monthlyPrice || 150000;
  const totalFee = Number(durationMonths) * monthlyPrice;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!kasir) return;

    extendContract(
      {
        durationMonths: Number(durationMonths) || 1,
        notes: notes || `Perpanjangan kontrak ${durationMonths} bulan`,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllKasir"] });
          queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
          queryClient.invalidateQueries({ queryKey: ["getContracts"] });
          toast.success(
            `Kontrak toko "${kasir.storeName || kasir.name}" berhasil diperpanjang ${durationMonths} bulan!`,
          );
          setNotes("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal memperpanjang kontrak";
          toast.error(msg);
        },
      },
    );
  }

  const currentEndDate = kasir?.contractEnd
    ? new Date(kasir.contractEnd).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Belum diset";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-2.5 text-blue-700">
          <div className="p-2 rounded-full bg-blue-100">
            <CalendarClock size={22} />
          </div>
          <DialogTitle className="font-bold text-lg text-[#041336]">
            Perpanjang Masa Aktif Kontrak
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600 mt-1">
          Tambahkan masa aktif langganan toko untuk akun kasir ini.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="bg-slate-50 p-3 rounded-lg border text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Nama Toko:</span>
              <strong className="text-gray-900">{kasir?.storeName || kasir?.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Username:</span>
              <span className="font-mono text-gray-700">@{kasir?.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Berakhir Pada:</span>
              <strong className="text-blue-700">{currentEndDate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Sisa Hari:</span>
              <span className="font-bold text-amber-600">
                {kasir?.daysRemaining || 0} Hari
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Pilih Tambahan Durasi
            </label>
            <Select
              value={durationMonths}
              onValueChange={(val) => setDurationMonths(val || "1")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">+1 Bulan</SelectItem>
                <SelectItem value="3">+3 Bulan</SelectItem>
                <SelectItem value="6">+6 Bulan</SelectItem>
                <SelectItem value="12">+12 Bulan (1 Tahun)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xs text-green-800">Biaya Perpanjangan</p>
              <p className="text-xs text-gray-500">
                {durationMonths} bln × {formatRupiah(monthlyPrice)}
              </p>
            </div>
            <h4 className="text-lg font-bold text-green-700">
              {formatRupiah(totalFee)}
            </h4>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Catatan Pembayaran (Opsional)
            </label>
            <Input
              placeholder="cth: Transfer BCA an Toko Berkah"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5"
            >
              {isPending ? "Memproses..." : "Konfirmasi Perpanjangan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
