import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionDeleteOwner() {
  const response = useMutation({
    mutationFn: async (id: string) => {
      return await adminService.deleteOwner(id);
    },
  });
  return response;
}
