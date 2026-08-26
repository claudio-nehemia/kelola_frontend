import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionUpdateKasir({ id }: { id: string }) {
  const response = useMutation({
    mutationFn: async (data: {
      name?: string;
      storeName?: string;
      email?: string;
      phone?: string;
      password?: string;
      isActive?: boolean;
    }) => {
      return await adminService.updateKasir({ id, data });
    },
  });
  return response;
}
