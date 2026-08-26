import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "@/lib/apiClient";
import { IResLogin } from "../models/authModel";
import { validationChangePassword } from "@/schema/validation-change-password";

export const authService = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post<IResLogin>(API_ENDPOINTS.AUTH.login, {
      username,
      password,
    });
    if (response.data) {
      const token =
        (response.data as any).token ||
        (response.data as any).data?.token ||
        "authenticated_token";
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      }
    }
    return response;
  },

  logout: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.logout);
      return response;
    } catch {
      return null;
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
      }
    }
  },

  changePassword: async ({ data }: { data: validationChangePassword }) => {
    const response = await apiClient.put(
      API_ENDPOINTS.AUTH.changePassword,
      data,
    );
    return response;
  },
};
