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
    getById: "/costumers",
  },
  contract: {
    generate: "/contracts/generate",
    download: "/contracts/download",
    sign: "/contracts/sign",
  },
  orders: {
    updateStatus: "/orders/status",
  }
}