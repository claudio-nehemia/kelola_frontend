import { validationChangePassword } from "@/schema/validation-change-password";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../service/authService";

export function useActionChangePassword() {
  const response = useMutation({
    mutationFn: async ({ data }: { data: validationChangePassword }) => {
      const response = await authService.changePassword({ data });
      return response;
    },
  });
  return response;
}
