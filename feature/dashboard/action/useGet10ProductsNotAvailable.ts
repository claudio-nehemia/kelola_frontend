import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";

export function useGet10ProductsNotAvailable() {
  const response = useQuery({
    queryKey: ["get10ProductsNotAvailable"],
    queryFn: async () => {
      return await productService.get10ProductsNotAvailable();
    },
    select: (response) => response.data.data,
  });
  return response;
}
