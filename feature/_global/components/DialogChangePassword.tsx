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
  const { mutate: changePassword } = useActionChangePassword();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();

  function handleSubmit() {
    const submit = ChangePasswordSchema.safeParse({
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
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

    if (submit.success) {
      changePassword(
        {
          data: {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        },
        {
          onSuccess: () => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            toast.success("Password berhasil diubah");
            setIsOpen(false);
          },
          onError: () => {
            toast.error("Gagal mengubah password");
          },
        },
      );
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          Ubah Password
        </DialogTitle>

        <div className="flex flex-col gap-2">
          <InputText
            namingText="Password Saat Ini"
            type="password"
            value={oldPassword}
            setValue={setOldPassword}
          />
          {errors?.oldPassword && (
            <p className="text-xs text-red-500">{errors.oldPassword}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputText
            namingText="Password Baru"
            type="password"
            value={newPassword}
            setValue={setNewPassword}
          />
          {errors?.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <InputText
            namingText="Konfirmasi Password Baru"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          {errors?.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <Button onClick={handleSubmit}>Simpan Password Baru</Button>
      </DialogContent>
    </Dialog>
  );
}
