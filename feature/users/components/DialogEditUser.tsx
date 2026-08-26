"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditUserSchema, validationEditUser } from "@/schema/validation-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionUpdateUser } from "../action/useActionUpdateUser";
import { UserItem } from "../models/userModel";

export function DialogEditUser({
  user,
  isOpen,
  setIsOpen,
}: {
  user: UserItem | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useActionUpdateUser({
    id: user?.id || "",
  });

  const form = useForm<validationEditUser>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Kasir",
      isActive: true,
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "Kasir",
        isActive: user.isActive,
        password: "",
      });
    }
  }, [user, form]);

  function onSubmit(values: validationEditUser) {
    if (!user) return;
    updateUser(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
        toast.success("Data pengguna berhasil diperbarui!");
        setIsOpen(false);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message || "Gagal memperbarui data pengguna";
        toast.error(msg);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogTitle className="font-bold text-xl text-[#041336]">
          Edit Pengguna / Staff
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Perbarui informasi profil, hak akses peran, atau status keaktifan akun.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
            <div className="bg-slate-50 p-2.5 rounded-md border text-xs text-gray-600 flex justify-between">
              <span>Username:</span>
              <strong className="text-gray-900 font-mono">{user?.username}</strong>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs text-gray-700">
                    Nama Lengkap *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs text-gray-700">
                      Peran / Hak Akses *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Owner">Owner (Pemilik)</SelectItem>
                        <SelectItem value="Admin">Admin (Kelola Toko)</SelectItem>
                        <SelectItem value="Kasir">Kasir (POS)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs text-gray-700">
                      Status Akun
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Aktif (Dapat Login)</SelectItem>
                        <SelectItem value="false">Nonaktif (Diblokir)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs text-gray-700">
                      No. Telepon / WA
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="08123456789" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@kelolatoko.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs text-gray-700">
                    Reset Password (Opsional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Kosongkan jika tidak ingin mengubah password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#041336] hover:bg-[#082057] text-white px-6 font-bold"
              >
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
