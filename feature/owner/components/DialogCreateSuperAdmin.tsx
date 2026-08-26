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
import { useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActionCreateSuperAdmin } from "../action/useActionCreateSuperAdmin";

export function DialogCreateSuperAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const queryClient = useQueryClient();
  const { mutate: createAdmin, isPending } = useActionCreateSuperAdmin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !username || !password) {
      toast.error("Nama, username, dan password wajib diisi!");
      return;
    }

    createAdmin(
      { name, username, password, email, phone },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getSuperAdmins"] });
          toast.success(`Akun Super Admin "${name}" berhasil dibuat!`);
          setName("");
          setUsername("");
          setPassword("");
          setEmail("");
          setPhone("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal membuat akun super admin";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-5 flex items-center gap-2 shadow-sm" />
        }
      >
        <UserPlus size={18} />
        <span>Tambah Super Admin</span>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <div className="flex items-center gap-2.5 text-blue-700">
          <div className="p-2 rounded-full bg-blue-100">
            <ShieldCheck size={22} />
          </div>
          <DialogTitle className="font-bold text-lg text-gray-900">
            Tambah Akun Super Admin Baru
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600">
          Buat akun operator teknis Super Admin untuk mengelola pendaftaran kasir, kontrak, dan operasional platform.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Nama Lengkap Admin *
            </label>
            <Input
              placeholder="cth: Arya Permana"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Username Login *
              </label>
              <Input
                placeholder="cth: superadmin_arya"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Password *
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
                No. WhatsApp / HP
              </label>
              <Input
                placeholder="08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Email
              </label>
              <Input
                type="email"
                placeholder="admin@kelolatoko.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
              {isPending ? "Menyimpan..." : "Simpan Super Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
