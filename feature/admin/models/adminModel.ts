import { GlobalResponse } from "@/feature/_global/interface/global.interface";

export interface IKasirUser {
  id: string;
  username: string;
  name: string;
  storeName: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  isActive: boolean;
  contractStart: string | null;
  contractEnd: string | null;
  daysRemaining: number;
  contractStatus: "active" | "warning_h10" | "expired" | "terminated" | string;
  createdAt: string;
  _count?: {
    products: number;
    transactions: number;
    categories: number;
  };
}

export interface IContractHistoryItem {
  id: string;
  userId: string;
  type: "NEW_CONTRACT" | "RENEWAL" | "TERMINATED" | string;
  durationMonths: number;
  amountPaid: number;
  startDate: string;
  endDate: string;
  notes: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    username: string;
    storeName: string | null;
    phone: string | null;
  };
}

export interface IContractPricing {
  id: string;
  monthlyPrice: number;
  description: string | null;
  updatedAt: string;
}

export interface ISuperAdminStats {
  totalKasir: number;
  activeCount: number;
  warningH10Count: number;
  expiredCount: number;
  terminatedCount: number;
  monthlyRevenue: number;
  totalRevenue: number;
  warningKasirList: IKasirUser[];
}

export interface IKasirMonitoring {
  user: {
    id: string;
    username: string;
    name: string;
    storeName: string | null;
    phone: string | null;
    email: string | null;
    isActive: boolean;
    contractStart: string | null;
    contractEnd: string | null;
  };
  summary: {
    totalProducts: number;
    totalCategories: number;
    totalTransactions: number;
    totalOmset: number;
  };
  products: any[];
  categories: any[];
  transactions: any[];
}

export interface IResGetKasirList extends GlobalResponse {
  data: IKasirUser[];
}

export interface IResGetContracts extends GlobalResponse {
  data: {
    totalRevenue: number;
    totalContracts: number;
    data: IContractHistoryItem[];
  };
}

export interface IResGetPricing extends GlobalResponse {
  data: IContractPricing;
}

export interface IResGetStats extends GlobalResponse {
  data: ISuperAdminStats;
}

export interface IResGetMonitoring extends GlobalResponse {
  data: IKasirMonitoring;
}
