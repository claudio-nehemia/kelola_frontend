import { validationAddProduct } from "@/schema/validation-add-product";
import { useMutation } from "@tanstack/react-query";
import productService from "../services/productService";

export function useActionUpdateProduct({ productId }: { productId: string }) {
  const response = useMutation({
    mutationFn: async (data: validationAddProduct) => {
      return await productService.updateProduct({ productId, data });
    },
  });
  return response;
}
