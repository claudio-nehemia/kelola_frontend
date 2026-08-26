import { validationAddUser } from "@/schema/validation-user";
import { useMutation } from "@tanstack/react-query";
import userService from "../services/userService";

export function useActionAddUser() {
  const response = useMutation({
    mutationFn: async (data: validationAddUser) => {
      return await userService.addUser({ data });
    },
  });
  return response;
}
