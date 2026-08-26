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
      return response.data.data;
    },
    onSuccess: (data) => {
      if (data) {
        setAuth({
          id: (data as any).id || "user_id",
          username: data.username,
          name: data.name || data.username,
          email: data.email || `${data.username}@kelola.local`,
          userType: data.userType || "OWNER",
        });
      }
      router.push("/dashboard");
    },
  });
  return response;
}
