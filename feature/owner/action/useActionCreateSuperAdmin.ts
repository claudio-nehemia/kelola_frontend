import { useMutation } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useActionCreateSuperAdmin() {
  const response = useMutation({
    mutationFn: async (data: {
      name: string;
      username: string;
      password: string;
      email?: string;
      phone?: string;
    }) => {
      return await ownerService.createSuperAdmin(data);
    },
  });
  return response;
}
