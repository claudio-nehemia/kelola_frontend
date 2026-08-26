import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

export function useGetAllUsers({
  search,
  role,
}: {
  search?: string;
  role?: string;
} = {}) {
  const response = useQuery({
    queryKey: ["getAllUsers", { search, role }],
    queryFn: async () => {
      return await userService.getAllUsers({ search, role });
    },
    select: (response) => response.data.data,
  });
  return response;
}
