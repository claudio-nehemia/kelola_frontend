import { useMutation } from "@tanstack/react-query";
import adminService from "../services/adminService";

export function useActionTerminateContract({ userId }: { userId: string }) {
  const response = useMutation({
    mutationFn: async (data?: { notes?: string }) => {
      return await adminService.terminateContract({
        userId,
        notes: data?.notes,
      });
    },
  });
  return response;
}
