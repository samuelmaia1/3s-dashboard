export const routes = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  users: {
    list: "/users",
    create: "/users/create", 
    get: "/users",       
    products: "/users/products",
    costumers: "/users/costumers",
    orders: "/users/orders",
    contracts: "/users/contracts",
  },
  dashboard: {
    summary: "/dashboard/summary",
  },
  product: {
    get: "/products",
    delete: "/products",
    update: "/products",
  },
  costumers: {
    create: "/costumers/create",
  },
  contract: {
    generate: "/contracts/generate",
  },
  orders: {
    updateStatus: "/orders/status",
  }
}