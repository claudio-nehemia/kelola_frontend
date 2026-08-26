"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { InputText } from "./InputText";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChangePasswordSchema } from "@/schema/validation-change-password";
import { useActionChangePassword } from "@/feature/auth/action/useActionChangePassword";
import { toast } from "sonner";

export function DialogChangePassword({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { mutate: changePassword, isPending } = useActionChangePassword();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  function handleSubmit() {
    setErrors({});
    const submit = ChangePasswordSchema.safeParse({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!submit.success) {
      const fieldErrors = submit.error.flatten().fieldErrors;
      setErrors({
        oldPassword: fieldErrors?.oldPassword?.[0] || "",
        newPassword: fieldErrors?.newPassword?.[0] || "",
        confirmPassword: fieldErrors?.confirmPassword?.[0] || "",
      });
      return;
    }

    changePassword(
      {
        data: {
          oldPassword,
          newPassword,
          confirmPassword,
        },
      },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          toast.success("Password berhasil diubah!");
          setIsOpen(false);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message || "Gagal mengubah password";
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          Ubah Password
        </DialogTitle>

        <div className="flex flex-col gap-3 my-2">
          <div className="flex flex-col gap-1">
            <InputText
              namingText="Password Saat Ini"
              type="password"
              value={oldPassword}
              setValue={setOldPassword}
            />
            {errors.oldPassword && (
              <p className="text-xs text-red-500 pl-1">{errors.oldPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <InputText
              namingText="Password Baru"
              type="password"
              value={newPassword}
              setValue={setNewPassword}
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 pl-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <InputText
              namingText="Konfirmasi Password Baru"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 pl-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={isPending} className="mt-2">
          {isPending ? "Menyimpan..." : "Simpan Password Baru"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
