import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";

export function useGetCategoryProduct() {
  const response = useQuery({
    queryKey: ["getCategoryProduct"],
    queryFn: async () => {
      const response = await productService.getCategoryProduct();
      return response;
    },
    select: (res) => res.data.data,
  });
  return response;
}
