import { useMutation } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useActionUpdateSuperAdmin({ id }: { id: string }) {
  const response = useMutation({
    mutationFn: async (data: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      isActive?: boolean;
    }) => {
      return await ownerService.updateSuperAdmin({ id, data });
    },
  });
  return response;
}
