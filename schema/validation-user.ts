import { z } from "zod";

export const AddUserSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(50),
  password: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: z.string(),
  isActive: z.boolean(),
});

export type validationAddUser = z.infer<typeof AddUserSchema>;

export const EditUserSchema = z.object({
  name: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: z.string(),
  isActive: z.boolean(),
  password: z.string().optional(),
});

export type validationEditUser = z.infer<typeof EditUserSchema>;
