import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  favorites: [],

  addToCart: (product) => {
    const cart = get().cart;

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }
  },

  removeFromCart: (id) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });
  },

  increaseQty: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });
  },

  decreaseQty: (id) => {
    set({
      cart: get()
        .cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  clearCart: () => set({ cart: [] }),

  addToFavorites: (product) => {
    const favorites = get().favorites;

    const exists = favorites.some((item) => item.id === product.id);

    if (exists) return;

    set({
      favorites: [...favorites, product],
    });
  },

  removeFromFavorites: (id) => {
    set({
      favorites: get().favorites.filter((item) => item.id !== id),
    });
  },

  clearFavorites: () => set({ favorites: [] }),
}));

export default useCartStore;