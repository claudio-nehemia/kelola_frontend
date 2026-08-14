import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export interface CategoryItem {
  id: string;
  name: string;
  categoryName?: string;
  _count?: {
    products: number;
  };
}

export function useCategories() {
  return useQuery<CategoryItem[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiClient.get(API_ENDPOINTS.CATEGORIES.GET_ALL);
      return res.data?.data || [];
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryName: string) => {
      const res = await apiClient.post(API_ENDPOINTS.CATEGORIES.CREATE, {
        categoryName,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
