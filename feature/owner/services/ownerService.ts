import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "@/lib/apiClient";
import {
  IResGetAuditLogs,
  IResGetOwnerOverview,
  IResGetOwnerReports,
  IResGetSuperAdmins,
} from "../models/ownerModel";

export const ownerService = {
  getOverview: async () => {
    const response = await apiClient.get<IResGetOwnerOverview>(
      API_ENDPOINTS.OWNER.OVERVIEW,
    );
    return response;
  },

  getSuperAdmins: async (search?: string) => {
    const response = await apiClient.get<IResGetSuperAdmins>(
      API_ENDPOINTS.OWNER.SUPERADMINS,
      {
        params: {
          search: search && search.trim() !== "" ? search : undefined,
        },
      },
    );
    return response;
  },

  createSuperAdmin: async (data: {
    name: string;
    username: string;
    password: string;
    email?: string;
    phone?: string;
  }) => {
    const response = await apiClient.post(
      API_ENDPOINTS.OWNER.CREATE_SUPERADMIN,
      data,
    );
    return response;
  },

  updateSuperAdmin: async ({
    id,
    data,
  }: {
    id: string;
    data: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      isActive?: boolean;
    };
  }) => {
    const response = await apiClient.put(
      API_ENDPOINTS.OWNER.UPDATE_SUPERADMIN(id),
      data,
    );
    return response;
  },

  deleteSuperAdmin: async (id: string) => {
    const response = await apiClient.delete(
      API_ENDPOINTS.OWNER.DELETE_SUPERADMIN(id),
    );
    return response;
  },

  getAuditLogs: async () => {
    const response = await apiClient.get<IResGetAuditLogs>(
      API_ENDPOINTS.OWNER.AUDIT_LOGS,
    );
    return response;
  },

  getReports: async () => {
    const response = await apiClient.get<IResGetOwnerReports>(
      API_ENDPOINTS.OWNER.REPORTS,
    );
    return response;
  },
};

export default ownerService;
