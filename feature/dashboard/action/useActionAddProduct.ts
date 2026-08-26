import { validationAddProduct } from "@/schema/validation-add-product";
import { useMutation } from "@tanstack/react-query";
import productService from "../services/productService";

export function useActionAddProduct() {
  const response = useMutation({
    mutationFn: async (data: validationAddProduct) => {
      return await productService.addProduct({ data });
    },
  });
  return response;
}
