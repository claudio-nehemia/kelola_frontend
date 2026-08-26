import z from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Password lama harus terdiri dari minimal 6 karakter"),
    newPassword: z
      .string()
      .min(6, "Password baru harus terdiri dari minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password harus terdiri dari minimal 6 karakter"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "Password baru tidak boleh sama dengan password lama",
    path: ["confirmPassword"],
  });

export type validationChangePassword = z.infer<typeof ChangePasswordSchema>;
