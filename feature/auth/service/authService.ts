import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "@/lib/apiClient";
import { IResLogin } from "../models/authModel";
import { validationChangePassword } from "@/schema/validation-change-password";

export const authService = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post<IResLogin>(API_ENDPOINTS.AUTH.LOGIN, {
      username,
      password,
    });
    if (response.data?.data?.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.data.token);
        document.cookie = `token=${response.data.data.token}; path=/; max-age=86400`;
      }
    }
    return response;
  },

  logout: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; max-age=0";
    }
    return { data: { status: "success", message: "Logout berhasil" } };
  },

  changePassword: async ({ data }: { data: validationChangePassword }) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data,
    );
    return response;
  },
};
