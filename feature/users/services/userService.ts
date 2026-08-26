import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "@/lib/apiClient";
import { IResGetUsers, IResGetUserDetail, UserItem } from "../models/userModel";
import { validationAddUser, validationEditUser } from "@/schema/validation-user";

export const userService = {
  getAllUsers: async ({
    search,
    role,
  }: {
    search?: string;
    role?: string;
  } = {}) => {
    const response = await apiClient.get<IResGetUsers>(
      API_ENDPOINTS.USERS.GET_ALL,
      {
        params: {
          search: search && search.trim() !== "" ? search : undefined,
          role: role && role !== "all" ? role : undefined,
        },
      },
    );
    return response;
  },

  getUserById: async (id: string) => {
    const response = await apiClient.get<IResGetUserDetail>(
      API_ENDPOINTS.USERS.GET_BY_ID(id),
    );
    return response;
  },

  addUser: async ({ data }: { data: validationAddUser }) => {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    return response;
  },

  updateUser: async ({
    id,
    data,
  }: {
    id: string;
    data: validationEditUser;
  }) => {
    const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response;
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    return response;
  },
};

export default userService;
