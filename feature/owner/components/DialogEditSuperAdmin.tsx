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
import { Edit, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActionUpdateSuperAdmin } from "../action/useActionUpdateSuperAdmin";
import { ISuperAdminItem } from "../models/ownerModel";

export function DialogEditSuperAdmin({
  admin,
  isOpen,
  setIsOpen,
}: {
  admin: ISuperAdminItem | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const queryClient = useQueryClient();
  const { mutate: updateAdmin, isPending } = useActionUpdateSuperAdmin({
    id: admin?.id || "",
  });

  useEffect(() => {
    if (admin) {
      setName(admin.name || "");
      setPhone(admin.phone || "");
      setEmail(admin.email || "");
      setIsActive(admin.isActive);
      setPassword("");
    }
  }, [admin]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!admin) return;

    updateAdmin(
      {
        name,
        phone,
        email,
        password: password.trim() !== "" ? password : undefined,
        isActive,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getSuperAdmins"] });
          toast.success(`Data Super Admin "${name}" berhasil diperbarui!`);
          setPassword("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal memperbarui data super admin";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-2.5 text-blue-700">
          <div className="p-2 rounded-full bg-blue-100">
            <Edit size={20} />
          </div>
          <DialogTitle className="font-bold text-lg text-gray-900">
            Edit Data Super Admin
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600">
          Perbarui informasi nama, kontak, status aktif, atau reset password akun Super Admin.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200 text-xs text-blue-900 flex justify-between items-center">
            <span>Username:</span>
            <strong className="font-mono">@{admin?.username}</strong>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Nama Lengkap Admin *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap admin"
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
                  <SelectItem value="true">Aktif</SelectItem>
                  <SelectItem value="false">Nonaktif (Diblokir)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kelolatoko.com"
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
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
