import { Control } from "react-hook-form";
import z from "zod";

export const AddOrderSchema = z.object({
  namaCustomer: z
    .string()
    .min(1, "Nama pelanggan wajib diisi!")
    .max(100, "Nama pelanggan tidak boleh lebih dari 100 karakter"),
  productSells: z
    .array(
      z.object({
        productId: z.string().min(1, "ID produk wajib diisi!"),
        quantity: z.number().min(1, "Kuantitas wajib diisi!"),
      }),
    )
    .min(1, "List item produk wajib diisi!"),
  inputPayment: z.number().min(1, "Jumlah pembayaran wajib diisi!"),
});

export type validationAddOrder = z.infer<typeof AddOrderSchema>;

export interface controlAddOrder {
  control: Control<validationAddOrder>;
}
