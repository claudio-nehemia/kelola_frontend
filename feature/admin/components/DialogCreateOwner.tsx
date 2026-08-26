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
import { Crown, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActionCreateOwner } from "../action/useActionCreateOwner";

export function DialogCreateOwner({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const queryClient = useQueryClient();
  const { mutate: createOwner, isPending } = useActionCreateOwner();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !username || !password) {
      toast.error("Nama, username, dan password wajib diisi!");
      return;
    }

    createOwner(
      { name, username, password, email, phone },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllOwners"] });
          toast.success(`Akun Owner "${name}" berhasil dibuat!`);
          setName("");
          setUsername("");
          setPassword("");
          setEmail("");
          setPhone("");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Gagal membuat akun owner";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-2.5 text-purple-700">
          <div className="p-2 rounded-full bg-purple-100">
            <Crown size={22} />
          </div>
          <DialogTitle className="font-bold text-lg text-gray-900">
            Tambah Akun Owner Baru
          </DialogTitle>
        </div>

        <DialogDescription className="text-xs text-gray-600">
          Buat akun pengguna dengan peran Owner (Pemilik Sistem / Stakeholder).
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Nama Lengkap *
            </label>
            <Input
              placeholder="cth: Bapak Bambang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Username *
              </label>
              <Input
                placeholder="cth: owner_utama"
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
                placeholder="owner@kelolatoko.com"
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
              className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-5"
            >
              {isPending ? "Menyimpan..." : "Simpan Akun Owner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
