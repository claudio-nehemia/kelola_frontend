import { useQuery } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useGetAuditLogs() {
  const response = useQuery({
    queryKey: ["getAuditLogs"],
    queryFn: async () => {
      return await ownerService.getAuditLogs();
    },
    select: (res) => res.data.data,
  });
  return response;
}
