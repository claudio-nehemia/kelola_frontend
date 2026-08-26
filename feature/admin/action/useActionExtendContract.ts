import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionExtendContract({ userId }: { userId: string }) {
  const response = useMutation({
    mutationFn: async (data: { durationMonths: number; notes?: string }) => {
      return await adminService.extendContract({
        userId,
        durationMonths: data.durationMonths,
        notes: data.notes,
      });
    },
  });
  return response;
}
