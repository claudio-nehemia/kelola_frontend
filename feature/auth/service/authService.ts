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
    return response;
  },

  logout: async () => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.logout);
    return response;
  },

  changePassword: async ({ data }: { data: validationChangePassword }) => {
    const response = await apiClient.put(
      API_ENDPOINTS.AUTH.changePassword,
      data,
    );
    return response;
  },
};
