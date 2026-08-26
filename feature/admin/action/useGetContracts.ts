import { useQuery } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useGetContracts({
  search,
  type,
}: {
  search?: string;
  type?: string;
} = {}) {
  const response = useQuery({
    queryKey: ["getContracts", { search, type }],
    queryFn: async () => {
      return await adminService.getContracts({ search, type });
    },
    select: (res) => res.data.data,
  });
  return response;
}
