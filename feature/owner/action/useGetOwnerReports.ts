import { useQuery } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useGetOwnerReports() {
  const response = useQuery({
    queryKey: ["getOwnerReports"],
    queryFn: async () => {
      return await ownerService.getReports();
    },
    select: (res) => res.data.data,
  });
  return response;
}
