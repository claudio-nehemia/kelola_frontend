"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
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
import { AddUserSchema, validationAddUser } from "@/schema/validation-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useActionAddUser } from "../action/useActionAddUser";

export function DialogAddUser({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: addUser, isPending } = useActionAddUser();

  const form = useForm<validationAddUser>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      role: "Kasir",
      isActive: true,
    },
  });

  function onSubmit(values: validationAddUser) {
    addUser(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
        toast.success("Pengguna baru berhasil ditambahkan!");
        form.reset();
        setIsOpen(false);
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message || "Gagal menambahkan pengguna baru";
        toast.error(msg);
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            className={`bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-5 flex items-center gap-2 ${className || ""}`}
          />
        }
      >
        <UserPlus size={18} />
        <p>Tambah Pengguna</p>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogTitle className="font-bold text-xl text-[#041336]">
          Tambah Pengguna / Staff
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Tambahkan akun pengguna baru beserta hak akses perannya di sistem.
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs text-gray-700">
                    Nama Lengkap *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="cth: Budi Santoso" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs text-gray-700">
                      Username *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="cth: budi_kasir" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs text-gray-700">
                      Password *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Minimal 6 karakter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

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
                      defaultValue={field.value}
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
            </div>

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
                      placeholder="budi@kelolatoko.com"
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
                {isPending ? "Menyimpan..." : "Simpan Pengguna"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
