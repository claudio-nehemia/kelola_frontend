import { Control } from "react-hook-form";
import z from "zod";

export const AddOrderSchema = z.object({
  nameCustomer: z
    .string()
    .min(1, "Nama produk wajib diisi!")
    .max(100, "Nama produk tidak boleh lebih dari 100 karakter"),
  listItemProduct: z
    .array(
      z.object({
        productId: z.string().min(1, "ID produk wajib diisi!"),
        name: z.string().min(1, "Nama produk wajib diisi!"),
        price: z.number().min(1, "Harga produk wajib diisi!"),
        quantity: z.number().min(1, "Kuantitas wajib diisi!"),
      }),
    )
    .min(1, "List item produk wajib diisi!"),
  inputPayment: z.number().min(1, "Kategori wajib diisi!"),
});

export type validationAddOrder = z.infer<typeof AddOrderSchema>;

export interface controlAddOrder {
  control: Control<validationAddOrder>;
}
