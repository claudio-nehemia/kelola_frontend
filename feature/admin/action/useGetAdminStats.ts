import { useQuery } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useGetAdminStats() {
  const response = useQuery({
    queryKey: ["getAdminStats"],
    queryFn: async () => {
      return await adminService.getStats();
    },
    select: (res) => res.data.data,
  });
  return response;
}
