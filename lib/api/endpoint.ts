export const API_ENDPOINTS = {
  auth: {
    login: "/auth/admin/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },

  products: {
    all: "/products",
    admin: "/admin/products",
    detail: (id: string) => `/admin/products/${id}`,
  },

  categories: {
    all: "/categories",
    admin: "/admin/categories",
  },

  inventory: {
    all: "/admin/inventory",
  },

  profile: {
    me: "/profile",
  },
};