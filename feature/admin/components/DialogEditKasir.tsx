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
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActionUpdateKasir } from "../action/useActionUpdateKasir";
import { IKasirUser } from "../models/adminModel";

export function DialogEditKasir({
  kasir,
  isOpen,
  setIsOpen,
}: {
  kasir: IKasirUser | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const queryClient = useQueryClient();
  const { mutate: updateKasir, isPending } = useActionUpdateKasir({
    id: kasir?.id || "",
  });

  useEffect(() => {
    if (kasir) {
      setName(kasir.name || "");
      setStoreName(kasir.storeName || "");
      setPhone(kasir.phone || "");
      setEmail(kasir.email || "");
      setIsActive(kasir.isActive);
      setPassword("");
    }
  }, [kasir]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!kasir) return;

    updateKasir(
      {
        name,
        storeName,
        phone,
        email,
        password: password.trim() !== "" ? password : undefined,
        isActive,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllKasir"] });
          queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
          toast.success(`Data toko "${storeName || name}" berhasil diperbarui!`);
          setPassword("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal memperbarui data kasir";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2.5 text-[#041336]">
          <div className="p-2 rounded-full bg-blue-50 text-blue-700">
            <Edit size={20} />
          </div>
          <DialogTitle className="font-bold text-lg">
            Edit Data Toko & Admin Kasir
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600">
          Ubah informasi profil penanggung jawab, nama toko, kontak, atau status akun kasir.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
          <div className="bg-slate-50 p-2.5 rounded-lg border text-xs text-gray-600 flex justify-between items-center">
            <span>Username:</span>
            <strong className="font-mono text-gray-900">@{kasir?.username}</strong>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Nama Pemilik / Penanggung Jawab *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Nama Toko / Usaha *
            </label>
            <Input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Nama toko"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                No. WhatsApp / HP
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Status Akun
              </label>
              <Select
                value={isActive ? "true" : "false"}
                onValueChange={(val) => setIsActive(val === "true")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Aktif (Dapat Login)</SelectItem>
                  <SelectItem value="false">Nonaktif (Diblokir)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Email Toko (Opsional)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@toko.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Reset Password (Opsional)
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kosongkan jika tidak ingin mengubah password"
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
              className="bg-[#041336] hover:bg-[#09225e] text-white font-bold px-5"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
