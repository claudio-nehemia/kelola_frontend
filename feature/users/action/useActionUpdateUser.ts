import { validationEditUser } from "@/schema/validation-user";
import { useMutation } from "@tanstack/react-query";
import userService from "../services/userService";

export function useActionUpdateUser({ id }: { id: string }) {
  const response = useMutation({
    mutationFn: async (data: validationEditUser) => {
      return await userService.updateUser({ id, data });
    },
  });
  return response;
}
