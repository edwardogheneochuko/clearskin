import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  loading: false,

  setLoading: (value) => set({ loading: value }),

  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;