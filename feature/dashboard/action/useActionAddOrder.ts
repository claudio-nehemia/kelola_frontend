import { validationAddOrder } from "@/schema/validation-add-order";
import { useMutation } from "@tanstack/react-query";
import productService from "../services/productService";

export function useActionAddOrder() {
  const response = useMutation({
    mutationFn: async ({ data }: { data: validationAddOrder }) => {
      return await productService.addOrder({ data });
    },
  });
  return response;
}
