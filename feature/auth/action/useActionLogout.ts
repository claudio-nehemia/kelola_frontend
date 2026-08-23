import { useMutation } from "@tanstack/react-query";
import { authService } from "../service/authService";
import { useAuthStore } from "@/state/authStore";
import { useRouter } from "next/navigation";

export function useActionLogout() {
  const setAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const response = useMutation({
    mutationFn: async () => {
      return await authService.logout();
    },
    onSuccess: () => {
      setAuth();
      router.push("/login");
    },
  });
  return response;
}
