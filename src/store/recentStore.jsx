import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecentStore = create(
  persist(
    (set, get) => ({
      recentlyViewed: [],

      addRecent: (product) => {
        const current = get().recentlyViewed;
        const filtered = current.filter((p) => p.id !== product.id);
        const updated  = [product, ...filtered].slice(0, 6);
        set({ recentlyViewed: updated });
      },

      clearRecent: () => set({ recentlyViewed: [] }),
    }),
    { name: "recent-storage" }
  )
);

export default useRecentStore;