import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export interface ProductItem {
  id: string;
  name: string;
  productName?: string;
  sellPrice: number;
  priceSell?: number;
  costPrice: number;
  cleanProfit?: number;
  stock: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  categoryName?: string;
}

export interface CreateProductPayload {
  productName: string;
  priceSell: number;
  cleanProfit: number;
  stock: number;
  category: string;
}

export function useProducts() {
  return useQuery<ProductItem[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
      return res.data?.data || [];
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const res = await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bestSellers"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<CreateProductPayload> }) => {
      const res = await apiClient.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
