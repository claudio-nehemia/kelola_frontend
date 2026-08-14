import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import { useAuthStore } from "@/state/authStore";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: { username: string; password: string }) => {
      const res = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.data) {
        setAuth(data.data);
      }
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: { username: string; oldPassword: string; newPassword: string }) => {
      const res = await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
      return res.data;
    },
  });
}
