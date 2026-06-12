import { create } from "zustand";

const useFilterStore = create((set) => ({
  search:    "",
  category:  "all",
  sortBy:    "default",
  minPrice:  0,
  maxPrice:  100,
  minRating: 0,
  inStock:   false,

  setSearch:    (search)    => set({ search }),
  setCategory:  (category)  => set({ category }),
  setSortBy:    (sortBy)    => set({ sortBy }),
  setMinPrice:  (minPrice)  => set({ minPrice }),
  setMaxPrice:  (maxPrice)  => set({ maxPrice }),
  setMinRating: (minRating) => set({ minRating }),
  setInStock:   (inStock)   => set({ inStock }),

  resetFilters: () => set({
    search: "", category: "all", sortBy: "default",
    minPrice: 0, maxPrice: 100, minRating: 0, inStock: false,
  }),
}));

export default useFilterStore;