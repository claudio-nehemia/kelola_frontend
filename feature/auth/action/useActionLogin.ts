import { useMutation } from "@tanstack/react-query";
import { authService } from "../service/authService";
import { useAuthStore } from "@/state/authStore";
import { useRouter } from "next/navigation";

export function useActionLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const response = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await authService.login(data.username, data.password);
      console.log("response", response.data.data);
      return response.data.data;
    },
    onSuccess: (data) => {
      setAuth(data);
      router.push("/dashboard");
    },
  });
  return response;
}
