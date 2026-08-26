import { useQuery } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useGetKasirMonitoring(kasirId: string) {
  const response = useQuery({
    queryKey: ["getKasirMonitoring", kasirId],
    queryFn: async () => {
      return await adminService.getKasirMonitoring(kasirId);
    },
    select: (res) => res.data.data,
    enabled: !!kasirId,
  });
  return response;
}
