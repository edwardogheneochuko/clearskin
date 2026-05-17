import { create } from "zustand";
import content from "@/assets/data/content.json";

const useAdminStore = create((set, get) => ({
  products: [
    ...content.products.map((p) => ({ ...p, category: "products" })),
    ...content.under25Products.map((p) => ({ ...p, category: "under25" })),
  ],
  orders: [], 
  users: [],  

  // PRODUCTS
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Date.now(), category: product.category || "products" },
      ],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  setOrders: (orders) => set({ orders }),

  setUsers: (users) => set({ users }),
}));

export default useAdminStore;