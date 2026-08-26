import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "@/lib/apiClient";
import {
  IResGetContracts,
  IResGetKasirList,
  IResGetMonitoring,
  IResGetPricing,
  IResGetStats,
} from "../models/adminModel";

export const adminService = {
  getStats: async () => {
    const response = await apiClient.get<IResGetStats>(
      API_ENDPOINTS.ADMIN.STATS,
    );
    return response;
  },

  getPricing: async () => {
    const response = await apiClient.get<IResGetPricing>(
      API_ENDPOINTS.ADMIN.PRICING,
    );
    return response;
  },

  updatePricing: async ({
    monthlyPrice,
    description,
  }: {
    monthlyPrice: number;
    description?: string;
  }) => {
    const response = await apiClient.put(API_ENDPOINTS.ADMIN.PRICING, {
      monthlyPrice,
      description,
    });
    return response;
  },

  getAllKasir: async ({
    search,
    status,
  }: {
    search?: string;
    status?: string;
  } = {}) => {
    const response = await apiClient.get<IResGetKasirList>(
      API_ENDPOINTS.ADMIN.KASIR_LIST,
      {
        params: {
          search: search && search.trim() !== "" ? search : undefined,
          status: status && status !== "all" ? status : undefined,
        },
      },
    );
    return response;
  },

  createKasir: async (data: {
    username: string;
    password: string;
    name: string;
    storeName?: string;
    email?: string;
    phone?: string;
    durationMonths?: number;
    notes?: string;
  }) => {
    const response = await apiClient.post(
      API_ENDPOINTS.ADMIN.CREATE_KASIR,
      data,
    );
    return response;
  },

  extendContract: async ({
    userId,
    durationMonths,
    notes,
  }: {
    userId: string;
    durationMonths: number;
    notes?: string;
  }) => {
    const response = await apiClient.post(
      API_ENDPOINTS.ADMIN.EXTEND_KASIR(userId),
      {
        durationMonths,
        notes,
      },
    );
    return response;
  },

  terminateContract: async ({
    userId,
    notes,
  }: {
    userId: string;
    notes?: string;
  }) => {
    const response = await apiClient.post(
      API_ENDPOINTS.ADMIN.TERMINATE_KASIR(userId),
      {
        notes,
      },
    );
    return response;
  },

  getContracts: async ({
    search,
    type,
  }: {
    search?: string;
    type?: string;
  } = {}) => {
    const response = await apiClient.get<IResGetContracts>(
      API_ENDPOINTS.ADMIN.CONTRACTS,
      {
        params: {
          search: search && search.trim() !== "" ? search : undefined,
          type: type && type !== "all" ? type : undefined,
        },
      },
    );
    return response;
  },

  getKasirMonitoring: async (kasirId: string) => {
    const response = await apiClient.get<IResGetMonitoring>(
      API_ENDPOINTS.ADMIN.MONITOR_KASIR(kasirId),
    );
    return response;
  },
};

export default adminService;
