import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";

export function useGet10ProductsAvailable() {
  const response = useQuery({
    queryKey: ["get10ProductsAvailable"],
    queryFn: async () => {
      return await productService.get10ProductsAvailable();
    },
    select: (response) => response.data.data,
  });
  return response;
}
