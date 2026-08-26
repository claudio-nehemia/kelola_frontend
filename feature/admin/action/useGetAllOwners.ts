import { useQuery } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useGetAllOwners(search?: string) {
  const response = useQuery({
    queryKey: ["getAllOwners", { search }],
    queryFn: async () => {
      return await adminService.getAllOwners(search);
    },
    select: (res) => res.data.data,
  });
  return response;
}
