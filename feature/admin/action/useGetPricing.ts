import { useQuery } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useGetPricing() {
  const response = useQuery({
    queryKey: ["getPricing"],
    queryFn: async () => {
      return await adminService.getPricing();
    },
    select: (res) => res.data.data,
  });
  return response;
}
