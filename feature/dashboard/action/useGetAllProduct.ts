import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";

export function useGetAllProduct({ search }: { search: string }) {
  const response = useQuery({
    queryKey: ["getAllProduct", search],
    queryFn: async () => {
      return await productService.getAllProduct(search);
    },
    select: (response) => response.data.data,
  });
  return response;
}
