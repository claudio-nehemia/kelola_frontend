import { useQuery } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useGetSuperAdmins(search?: string) {
  const response = useQuery({
    queryKey: ["getSuperAdmins", { search }],
    queryFn: async () => {
      return await ownerService.getSuperAdmins(search);
    },
    select: (res) => res.data.data,
  });
  return response;
}
