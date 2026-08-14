"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { InputText } from "./InputText";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChangePasswordSchema } from "@/schema/validation-change-password";
import { useChangePassword } from "@/hooks/useAuth";
import { useAuthStore } from "@/state/authStore";

export function DialogChangePassword({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [generalError, setGeneralError] = useState("");

  const user = useAuthStore((state) => state.data);
  const changePasswordMutation = useChangePassword();

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  async function handleSubmit() {
    setGeneralError("");
    const submit = ChangePasswordSchema.safeParse({
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    if (!submit.success) {
      const fieldErrors = submit.error.flatten().fieldErrors;
      setErrors({
        currentPassword: fieldErrors.currentPassword?.[0] || "",
        newPassword: fieldErrors.newPassword?.[0] || "",
        confirmPassword: fieldErrors.confirmPassword?.[0] || "",
      });
      return;
    }

    setErrors({});

    try {
      await changePasswordMutation.mutateAsync({
        username: user?.username || "admin",
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      alert("Password berhasil diperbarui!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsOpen(false);
    } catch (err: any) {
      setGeneralError(err?.response?.data?.message || "Gagal mengubah password");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          Ubah Password
        </DialogTitle>

        <div className="space-y-4 my-2">
          <div>
            <InputText
              namingText="Password Saat Ini"
              type="password"
              value={currentPassword}
              setValue={setCurrentPassword}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <InputText
              namingText="Password Baru"
              type="password"
              value={newPassword}
              setValue={setNewPassword}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <InputText
              namingText="Konfirmasi Password Baru"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {generalError && (
          <p className="text-red-500 text-sm font-semibold">{generalError}</p>
        )}

        <Button
          onClick={handleSubmit}
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending ? "Menyimpan..." : "Simpan Password Baru"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
