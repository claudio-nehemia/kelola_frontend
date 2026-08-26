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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActionCreateKasir } from "../action/useActionCreateKasir";
import { useGetPricing } from "../action/useGetPricing";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";

export function DialogCreateKasir({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [durationMonths, setDurationMonths] = useState("1");
  const [notes, setNotes] = useState("");

  const queryClient = useQueryClient();
  const { data: pricing } = useGetPricing();
  const { mutate: createKasir, isPending } = useActionCreateKasir();

  const monthlyPrice = pricing?.monthlyPrice || 150000;
  const totalAmount = Number(durationMonths) * monthlyPrice;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !username || !password) {
      toast.error("Nama, username, dan password wajib diisi!");
      return;
    }

    createKasir(
      {
        name,
        storeName: storeName || name,
        username,
        password,
        phone,
        email,
        durationMonths: Number(durationMonths) || 1,
        notes,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllKasir"] });
          queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
          queryClient.invalidateQueries({ queryKey: ["getContracts"] });
          toast.success("Akun Admin Kasir baru berhasil dibuat & kontrak diaktifkan!");
          setName("");
          setStoreName("");
          setUsername("");
          setPassword("");
          setPhone("");
          setEmail("");
          setNotes("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Gagal membuat akun kasir";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            className={`bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-5 flex items-center gap-2 ${className || ""}`}
          />
        }
      >
        <PlusCircle size={18} />
        <p>Daftarkan Kasir Baru</p>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 text-[#041336]">
          <Store size={24} />
          <DialogTitle className="font-bold text-xl">
            Pendaftaran Admin Kasir / Toko Baru
          </DialogTitle>
        </div>
        <DialogDescription className="text-xs text-muted-foreground">
          Buat akun toko baru dan tentukan durasi kontrak awal. Sistem akan otomatis mengaktifkan masa aktif toko.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Nama Pemilik / Penanggung Jawab *
              </label>
              <Input
                placeholder="cth: Hendra Wijaya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Nama Toko / Usaha *
              </label>
              <Input
                placeholder="cth: Toko Berkah Mandiri"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Username Login *
              </label>
              <Input
                placeholder="cth: berkah_pos"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Password Login *
              </label>
              <Input
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                No. WhatsApp / Telepon
              </label>
              <Input
                placeholder="08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Email Toko (Opsional)
              </label>
              <Input
                type="email"
                placeholder="toko@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Durasi Kontrak & Kalkulasi Biaya */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-800">
                Pilih Durasi Masa Aktif Kontrak
              </label>
              <Select
                value={durationMonths}
                onValueChange={(val) => setDurationMonths(val || "1")}
              >
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bulan</SelectItem>
                  <SelectItem value="3">3 Bulan</SelectItem>
                  <SelectItem value="6">6 Bulan</SelectItem>
                  <SelectItem value="12">12 Bulan (1 Tahun)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between text-xs text-gray-600 pt-2 border-t">
              <span>Tarif Langganan / Bulan:</span>
              <span className="font-semibold text-gray-900">
                {formatRupiah(monthlyPrice)}
              </span>
            </div>

            <div className="flex justify-between text-sm font-bold text-green-700">
              <span>Total Biaya Masuk Kontrak:</span>
              <span className="text-base">{formatRupiah(totalAmount)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Catatan Pendaftaran (Opsional)
            </label>
            <Input
              placeholder="cth: Pembayaran via transfer BCA"
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
              className="bg-[#041336] hover:bg-[#09225e] text-white font-bold px-6"
            >
              {isPending ? "Mendaftarkan..." : "Daftarkan & Aktifkan Kontrak"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
