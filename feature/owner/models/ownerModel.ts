import { GlobalResponse } from "@/feature/_global/interface/global.interface";

export interface IOwnerFinancials {
  mrr: number;
  arr: number;
  monthlyContractRevenue: number;
  yearlyContractRevenue: number;
  totalContractRevenue: number;
  monthlyPrice: number;
}

export interface IOwnerStoreMetrics {
  totalStores: number;
  activeStores: number;
  warningH10Stores: number;
  expiredStores: number;
  terminatedStores: number;
  draftStores: number;
}

export interface IOwnerEcosystemMetrics {
  ecosystemGmv: number;
  totalProcessedTransactions: number;
}

export interface ITopStoreItem {
  id: string;
  name: string;
  storeName: string;
  phone: string | null;
  totalTransactions: number;
  totalProducts: number;
  totalOmset: number;
}

export interface IOwnerOverviewData {
  financials: IOwnerFinancials;
  stores: IOwnerStoreMetrics;
  ecosystem: IOwnerEcosystemMetrics;
  topStores: ITopStoreItem[];
}

export interface ISuperAdminItem {
  id: string;
  username: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuditLogItem {
  id: string;
  userId: string | null;
  username: string | null;
  action: string;
  details: string | null;
  createdAt: string;
}

export interface IMonthlyFinancialBreakdown {
  month: string;
  totalRevenue: number;
  contractCount: number;
}

export interface IOwnerReportsData {
  monthlyBreakdown: IMonthlyFinancialBreakdown[];
  recentContracts: any[];
}

export interface IResGetOwnerOverview extends GlobalResponse {
  data: IOwnerOverviewData;
}

export interface IResGetSuperAdmins extends GlobalResponse {
  data: ISuperAdminItem[];
}

export interface IResGetAuditLogs extends GlobalResponse {
  data: IAuditLogItem[];
}

export interface IResGetOwnerReports extends GlobalResponse {
  data: IOwnerReportsData;
}
