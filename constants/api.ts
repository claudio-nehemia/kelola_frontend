export const API_ENDPOINTS = {
  AUTH: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    changePassword: "/api/auth/change-password",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    CHANGE_PASSWORD: "/api/auth/change-password",
  },
  USERS: {
    GET_ALL: "/api/users",
    CREATE: "/api/users",
    GET_BY_ID: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },
  PRODUCT: {
    get10ProductsAvailable: "/api/products",
    get10ProductsNotAvailable: "/api/products",
    addCategory: "/api/categories",
    getCategory: "/api/categories",
    addProduct: "/api/products",
    updateProduct: "/api/products",
    allProduct: "/api/products",
    allProductStatus: "/api/products",
  },
  ORDER: {
    addOrder: "/api/transactions",
  },
  CATEGORIES: {
    GET_ALL: "/api/categories",
    CREATE: "/api/categories",
  },
  PRODUCTS: {
    GET_ALL: "/api/products",
    CREATE: "/api/products",
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
  },
  TRANSACTIONS: {
    GET_ALL: "/api/transactions",
    CREATE: "/api/transactions",
    GET_BY_ID: (id: string) => `/api/transactions/${id}`,
    ANALYTICS: "/api/transactions/analytics",
    GET_ANALYTICS: "/api/transactions/analytics",
    BEST_SELLERS: "/api/transactions/best-sellers",
    GET_BEST_SELLERS: "/api/transactions/best-sellers",
  },
};
