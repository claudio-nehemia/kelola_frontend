import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export interface TransactionOrderItem {
  productId: string;
  quantity: number;
  price?: number;
  name?: string;
}

export interface CreateOrderPayload {
  nameCustomer: string;
  inputPayment: number;
  paymentMethod?: string;
  listItemProduct: TransactionOrderItem[];
}

export interface TransactionRecord {
  id: string;
  invoice: string;
  customerName: string;
  totalAmount: number;
  inputPayment: number;
  changeAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}

export function useTransactions() {
  return useQuery<TransactionRecord[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.GET_ALL);
      return res.data?.data || [];
    },
  });
}

export function useTransactionAnalytics() {
  return useQuery({
    queryKey: ["transactionAnalytics"],
    queryFn: async () => {
      const res = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.GET_ANALYTICS);
      return res.data?.data || { totalTransactions: 0, totalRevenue: 0, chartData: [] };
    },
  });
}

export function useBestSellers() {
  return useQuery({
    queryKey: ["bestSellers"],
    queryFn: async () => {
      const res = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.GET_BEST_SELLERS);
      return res.data?.data || [];
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await apiClient.post(API_ENDPOINTS.TRANSACTIONS.CREATE, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["transactionAnalytics"] });
      queryClient.invalidateQueries({ queryKey: ["bestSellers"] });
    },
  });
}
