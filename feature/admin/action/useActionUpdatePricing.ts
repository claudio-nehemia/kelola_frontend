import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionUpdatePricing() {
  const response = useMutation({
    mutationFn: async (data: { monthlyPrice: number; description?: string }) => {
      return await adminService.updatePricing(data);
    },
  });
  return response;
}
