import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionUpdateOwner({ id }: { id: string }) {
  const response = useMutation({
    mutationFn: async (data: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      isActive?: boolean;
    }) => {
      return await adminService.updateOwner({ id, data });
    },
  });
  return response;
}
