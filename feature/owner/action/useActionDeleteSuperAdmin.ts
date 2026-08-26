import { useMutation } from "@tanstack/react-query";
import ownerService from "../services/ownerService";

export function useActionDeleteSuperAdmin() {
  const response = useMutation({
    mutationFn: async (id: string) => {
      return await ownerService.deleteSuperAdmin(id);
    },
  });
  return response;
}
