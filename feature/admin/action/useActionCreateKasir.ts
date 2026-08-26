import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionCreateKasir() {
  const response = useMutation({
    mutationFn: async (data: {
      username: string;
      password: string;
      name: string;
      storeName?: string;
      email?: string;
      phone?: string;
      durationMonths?: number;
      notes?: string;
      isDraft?: boolean;
    }) => {
      return await adminService.createKasir(data);
    },
  });
  return response;
}
