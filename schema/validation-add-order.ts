import z from "zod";

export const AddOrderSchema = z.object({
  namaCustomer: z.string(),
  nameCustomer: z.string(),
  paymentMethod: z.string(),
  listItemProduct: z.array(
    z.object({
      productId: z.string(),
      name: z.string().optional(),
      price: z.number().optional(),
      quantity: z.number(),
    }),
  ),
  productSells: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      }),
    )
    .optional(),
  inputPayment: z.number(),
});

export type validationAddOrder = z.infer<typeof AddOrderSchema>;

export interface controlAddOrder {
  control: any;
}
