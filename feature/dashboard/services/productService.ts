import { API_ENDPOINTS } from "@/constants/api";
import { IResGet10Products } from "@/feature/dashboard/models/productModel";
import apiClient from "@/lib/apiClient";
import { validationAddProduct } from "@/schema/validation-add-product";
import { IResGetCategory } from "../models/categoryModel";
import { validationAddOrder } from "@/schema/validation-add-order";
import { AxiosResponse } from "axios";

const productService = {
  addCategoryProduct: async ({ name }: { name: string }) => {
    const response = await apiClient.post(API_ENDPOINTS.CATEGORIES.CREATE, {
      name,
    });
    return response;
  },

  getCategoryProduct: async () => {
    const response = await apiClient.get<IResGetCategory>(
      API_ENDPOINTS.CATEGORIES.GET_ALL,
    );
    return response;
  },

  getAllProduct: async (search?: string): Promise<AxiosResponse<IResGet10Products>> => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
    if (response.data && Array.isArray(response.data.data)) {
      let filtered = response.data.data;
      if (search && search.trim() !== "") {
        filtered = filtered.filter((p: any) =>
          (p.name || p.productName || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
      }
      const mapped = filtered.map((p: any) => ({
        id: p.id,
        name: p.name || p.productName || "",
        priceSell: p.sellPrice || p.priceSell || 0,
        profit:
          p.cleanProfit !== undefined
            ? p.cleanProfit
            : p.sellPrice !== undefined && p.costPrice !== undefined
              ? p.sellPrice - p.costPrice
              : 0,
        stock: p.stock ?? 0,
        category: p.category?.name || p.categoryName || "-",
      }));
      return {
        ...response,
        data: {
          ...response.data,
          data: mapped,
        },
      };
    }
    return response;
  },

  getAllProductAvailable: async ({
    status,
    category,
  }: {
    status?: string;
    category?: string;
  }): Promise<AxiosResponse<IResGet10Products>> => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
    if (response.data && Array.isArray(response.data.data)) {
      let filtered = response.data.data;
      if (status === "tersedia") {
        filtered = filtered.filter((p: any) => p.stock > 0);
      } else if (status === "tidak_tersedia") {
        filtered = filtered.filter((p: any) => p.stock <= 0);
      }
      if (category && category !== "all") {
        filtered = filtered.filter(
          (p: any) =>
            p.categoryId === category ||
            p.category?.id === category ||
            p.category?.name === category,
        );
      }
      const mapped = filtered.map((p: any) => ({
        id: p.id,
        name: p.name || p.productName || "",
        priceSell: p.sellPrice || p.priceSell || 0,
        profit:
          p.cleanProfit !== undefined
            ? p.cleanProfit
            : p.sellPrice !== undefined && p.costPrice !== undefined
              ? p.sellPrice - p.costPrice
              : 0,
        stock: p.stock ?? 0,
        category: p.category?.name || p.categoryName || "-",
      }));
      return {
        ...response,
        data: {
          ...response.data,
          data: mapped,
        },
      };
    }
    return response;
  },

  addProduct: async ({ data }: { data: validationAddProduct }) => {
    const payload = {
      name: data.name,
      priceSell: data.priceSell,
      cleanProfit: data.profit,
      stock: data.stock,
      categoryId: data.categoryId,
    };
    const response = await apiClient.post(
      API_ENDPOINTS.PRODUCTS.CREATE,
      payload,
    );
    return response;
  },

  updateProduct: async ({
    productId,
    data,
  }: {
    productId: string;
    data: validationAddProduct;
  }) => {
    const payload = {
      name: data.name,
      priceSell: data.priceSell,
      cleanProfit: data.profit,
      stock: data.stock,
      categoryId: data.categoryId,
    };
    const response = await apiClient.put(
      API_ENDPOINTS.PRODUCTS.UPDATE(productId),
      payload,
    );
    return response;
  },

  get10ProductsAvailable: async (): Promise<AxiosResponse<IResGet10Products>> => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
    if (response.data && Array.isArray(response.data.data)) {
      const filtered = response.data.data
        .filter((p: any) => p.stock > 0)
        .slice(0, 10)
        .map((p: any) => ({
          id: p.id,
          name: p.name || p.productName || "",
          priceSell: p.sellPrice || p.priceSell || 0,
          profit:
            p.cleanProfit !== undefined
              ? p.cleanProfit
              : p.sellPrice !== undefined && p.costPrice !== undefined
                ? p.sellPrice - p.costPrice
                : 0,
          stock: p.stock ?? 0,
          category: p.category?.name || p.categoryName || "-",
        }));
      return {
        ...response,
        data: {
          ...response.data,
          data: filtered,
        },
      };
    }
    return response;
  },

  get10ProductsNotAvailable: async (): Promise<AxiosResponse<IResGet10Products>> => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
    if (response.data && Array.isArray(response.data.data)) {
      const filtered = response.data.data
        .filter((p: any) => p.stock <= 0)
        .slice(0, 10)
        .map((p: any) => ({
          id: p.id,
          name: p.name || p.productName || "",
          priceSell: p.sellPrice || p.priceSell || 0,
          profit:
            p.cleanProfit !== undefined
              ? p.cleanProfit
              : p.sellPrice !== undefined && p.costPrice !== undefined
                ? p.sellPrice - p.costPrice
                : 0,
          stock: p.stock ?? 0,
          category: p.category?.name || p.categoryName || "-",
        }));
      return {
        ...response,
        data: {
          ...response.data,
          data: filtered,
        },
      };
    }
    return response;
  },

  addOrder: async ({ data }: { data: validationAddOrder }) => {
    const customerName = data.namaCustomer || data.nameCustomer || "Umum";
    const rawItems = data.listItemProduct || data.productSells || [];
    const listItemProduct = rawItems.map((item: any) => ({
      productId: item.productId,
      quantity: Number(item.quantity) || 1,
      price: item.price !== undefined ? Number(item.price) : undefined,
    }));
    const response = await apiClient.post(API_ENDPOINTS.TRANSACTIONS.CREATE, {
      customerName,
      inputPayment: Number(data.inputPayment) || 0,
      paymentMethod: data.paymentMethod || "Cash",
      listItemProduct,
    });
    return response;
  },
};

export default productService;
