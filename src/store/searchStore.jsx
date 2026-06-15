import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSearchStore = create(
  persist(
    (set, get) => ({
      recentSearches: [],

      addSearch: (term) => {
        const trimmed = term.trim();
        if (!trimmed) return;
        const filtered = get().recentSearches.filter(
          (s) => s.toLowerCase() !== trimmed.toLowerCase()
        );
        set({ recentSearches: [trimmed, ...filtered].slice(0, 5) });
      },

      removeSearch: (term) =>
        set({
          recentSearches: get().recentSearches.filter((s) => s !== term),
        }),

      clearSearches: () => set({ recentSearches: [] }),
    }),
    { name: "search-storage" }
  )
);

export default useSearchStore;