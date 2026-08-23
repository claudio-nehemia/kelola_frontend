export const API_ENDPOINTS = {
  AUTH: {
    login: "/api/sign-in",
    logout: "/api/sign-out",
    changePassword: "/api/change-password",
  },
  PRODUCT: {
    get10ProductsAvailable: "/api/product/10-products-available",
    get10ProductsNotAvailable: "/api/product/10-products-not-available",
    addCategory: "/api/category/add-category",
    getCategory: "/api/category/get-category",
    addProduct: "/api/product/add-product",
    updateProduct: "/api/product/edit-product",
    allProduct: "/api/product/search/get-all-products",
    allProductStatus: "/api/product/all-products-status",
  },
  ORDER: {
    addOrder: "/api/order/add-orders",
  },
};
