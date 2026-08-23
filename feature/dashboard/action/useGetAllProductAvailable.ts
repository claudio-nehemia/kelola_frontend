import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";

export function useGetAllProductAvailable({
  status,
  category,
}: {
  status?: string;
  category?: string;
}) {
  const response = useQuery({
    queryKey: ["getAllProductAvailable", { status, category }],
    queryFn: async () => {
      return await productService.getAllProductAvailable({ status, category });
    },
    select: (response) => response.data.data,
  });
  return response;
}
