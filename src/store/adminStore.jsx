import { create } from "zustand";
import { persist } from "zustand/middleware";
import content from "@/assets/data/content.json";

const useAdminStore = create(
  persist(
    (set) => ({
      products: [
        ...content.products.map((p)        => ({ ...p, category: "products", inStock: true })),
        ...content.under25Products.map((p) => ({ ...p, category: "under25",  inStock: true })),
      ],

      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id:       Date.now(),
              category: product.category || "products",
              inStock:  true,
            },
          ],
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // ✅ Toggle in/out of stock
      toggleStock: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
          ),
        })),
    }),
    { name: "admin-storage" }
  )
);

export default useAdminStore;