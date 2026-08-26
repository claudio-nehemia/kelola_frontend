import { useQuery } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useGetOwnerOverview() {
  const response = useQuery({
    queryKey: ["getOwnerOverview"],
    queryFn: async () => {
      return await ownerService.getOverview();
    },
    select: (res) => res.data.data,
  });
  return response;
}
