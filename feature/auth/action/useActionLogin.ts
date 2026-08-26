import { useMutation } from "@tanstack/react-query";
import { authService } from "../service/authService";
import { useAuthStore } from "@/state/authStore";
import { useRouter } from "next/navigation";
import { User } from "../models/authModel";

export function useActionLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const response = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await authService.login(data.username, data.password);
      return response.data.data;
    },
    onSuccess: (data: any) => {
      const user: User = data?.user || {
        id: data?.id,
        username: data?.username,
        name: data?.name,
        email: data?.email,
        userType: data?.userType,
      };
      setAuth(user);
      router.push("/dashboard");
    },
  });
  return response;
}
