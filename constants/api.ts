export const URL_BE = process.env.NEXT_PUBLIC_BE_URL || process.env.BE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  CATEGORIES: {
    GET_ALL: "/api/categories",
    CREATE: "/api/categories",
    GET_BY_ID: (id: string) => `/api/categories/${id}`,
    UPDATE: (id: string) => `/api/categories/${id}`,
    DELETE: (id: string) => `/api/categories/${id}`,
  },
  PRODUCTS: {
    GET_ALL: "/api/products",
    CREATE: "/api/products",
    GET_BY_ID: (id: string) => `/api/products/${id}`,
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
  },
  TRANSACTIONS: {
    GET_ALL: "/api/transactions",
    CREATE: "/api/transactions",
    GET_BY_ID: (id: string) => `/api/transactions/${id}`,
    GET_ANALYTICS: "/api/transactions/analytics",
    GET_BEST_SELLERS: "/api/transactions/best-sellers",
  },
  AUTH: {
    LOGIN: "/api/auth/login",
    CHANGE_PASSWORD: "/api/auth/change-password",
  },
};