import { useMutation } from "@tanstack/react-query";
import userService from "../services/userService";

export function useActionDeleteUser() {
  const response = useMutation({
    mutationFn: async (id: string) => {
      return await userService.deleteUser(id);
    },
  });
  return response;
}
