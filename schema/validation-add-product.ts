import z from "zod";

export const AddProductSchema = z.object({
  name: z
    .string()
    .min(1, "Nama produk wajib diisi!")
    .max(100, "Nama produk tidak boleh lebih dari 100 karakter"),
  priceSell: z.number().min(1, "Harga jual wajib diisi!").max(1000000),
  profit: z.number().min(1, "Harga beli wajib diisi!").max(1000000),
  stock: z.number().min(1, "Stok wajib diisi!"),
  categoryId: z.string().min(1, "Kategori wajib diisi!"),
});

export type validationAddProduct = z.infer<typeof AddProductSchema>;
