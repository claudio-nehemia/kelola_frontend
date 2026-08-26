import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionCreateOwner() {
  const response = useMutation({
    mutationFn: async (data: {
      name: string;
      username: string;
      password: string;
      email?: string;
      phone?: string;
    }) => {
      return await adminService.createOwner(data);
    },
  });
  return response;
}
