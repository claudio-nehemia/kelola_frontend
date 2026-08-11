import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { InputText } from "./InputText";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChangePasswordSchema } from "@/schema/validation-change-password";

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

  const [errors, setErrors] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleSumbit() {
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
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          Ubah Password
        </DialogTitle>

        <InputText
          namingText="Password Saat Ini"
          type="password"
          value={currentPassword}
          setValue={setCurrentPassword}
        />
        <InputText
          namingText="Password Baru"
          type="password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <InputText
          namingText="Konfirmasi Password Baru"
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />

        <Button onClick={handleSumbit}>Simpan Password Baru</Button>
      </DialogContent>
    </Dialog>
  );
}
