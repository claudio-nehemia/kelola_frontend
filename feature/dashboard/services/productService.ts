import { API_ENDPOINTS } from "@/constants/api";
import { IResGet10Products } from "@/feature/dashboard/models/productModel";
import apiClient from "@/lib/apiClient";
import { validationAddProduct } from "@/schema/validation-add-product";
import { IResGetCategory } from "../models/categoryModel";
import { validationAddOrder } from "@/schema/validation-add-order";

const productService = {
  addCategoryProduct: async ({ name }: { name: string }) => {
    const response = await apiClient.post(API_ENDPOINTS.PRODUCT.addCategory, {
      name,
    });
    return response;
  },

  getCategoryProduct: async () => {
    const response = await apiClient.get<IResGetCategory>(
      API_ENDPOINTS.PRODUCT.getCategory,
    );
    return response;
  },

  getAllProduct: async (search?: string) => {
    const response = await apiClient.get<IResGet10Products>(
      API_ENDPOINTS.PRODUCT.allProduct,
      {
        params: {
          search,
        },
      },
    );
    return response;
  },

  getAllProductAvailable: async ({
    status,
    category,
  }: {
    status?: string;
    category?: string;
  }) => {
    const response = await apiClient.get<IResGet10Products>(
      API_ENDPOINTS.PRODUCT.allProductStatus,
      {
        params: {
          status,
          category,
        },
      },
    );
    return response;
  },

  addProduct: async ({ data }: { data: validationAddProduct }) => {
    const response = await apiClient.post(
      API_ENDPOINTS.PRODUCT.addProduct,
      data,
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
    const response = await apiClient.put(
      `${API_ENDPOINTS.PRODUCT.updateProduct}/${productId}`,
      data,
    );
    return response;
  },

  get10ProductsAvailable: async () => {
    const response = await apiClient.get<IResGet10Products>(
      API_ENDPOINTS.PRODUCT.get10ProductsAvailable,
    );
    return response;
  },
  get10ProductsNotAvailable: async () => {
    const response = await apiClient.get<IResGet10Products>(
      API_ENDPOINTS.PRODUCT.get10ProductsNotAvailable,
    );
    return response;
  },

  addOrder: async ({ data }: { data: validationAddOrder }) => {
    const { namaCustomer, productSells } = data;
    const response = await apiClient.post(API_ENDPOINTS.ORDER.addOrder, {
      namaCustomer,
      productSells,
    });
    return response;
  },
};

export default productService;
