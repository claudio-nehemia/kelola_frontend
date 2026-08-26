import { useMutation } from "@tanstack/react-query";
import productService from "../services/productService";

export function useActionCategoryProduct() {
  const response = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const response = await productService.addCategoryProduct({ name });
      return response;
    },
  });
  return response;
}
