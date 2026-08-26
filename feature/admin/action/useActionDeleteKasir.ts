import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionDeleteKasir() {
  const response = useMutation({
    mutationFn: async (id: string) => {
      return await adminService.deleteKasir(id);
    },
  });
  return response;
}
