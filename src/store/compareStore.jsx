import { create } from "zustand";

const useCompareStore = create((set, get) => ({
  compared: [],

  addToCompare: (product) => {
    const current = get().compared;

    const exists = current.some((p) => p.id === product.id);
    if (exists) return "exists";

    if (current.length >= 3) return "max";

    set({ compared: [...current, product] });
    return "added";
  },

  removeFromCompare: (id) => {
    set({
      compared: get().compared.filter((p) => p.id !== id),
    });
  },

  clearCompare: () => set({ compared: [] }),
}));

export default useCompareStore;