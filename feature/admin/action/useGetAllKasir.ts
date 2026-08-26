import { useQuery } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useGetAllKasir({
  search,
  status,
}: {
  search?: string;
  status?: string;
} = {}) {
  const response = useQuery({
    queryKey: ["getAllKasir", { search, status }],
    queryFn: async () => {
      return await adminService.getAllKasir({ search, status });
    },
    select: (res) => res.data.data,
  });
  return response;
}
