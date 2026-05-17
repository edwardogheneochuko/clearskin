import { create } from "zustand";

const useCartStore = create((set, get) => ({
  carts: {},
  favorites: {},

  getCart: (userId) => get().carts[userId] || [],
  getFavorites: (userId) => get().favorites[userId] || [],

  addToCart: (userId, product) => {
    const carts = get().carts;
    const userCart = carts[userId] || [];
    const existing = userCart.find((item) => item.id === product.id);

    const updatedCart = existing
      ? userCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...userCart, { ...product, quantity: 1 }];

    set({ carts: { ...carts, [userId]: updatedCart } });
  },

  removeFromCart: (userId, productId) => {
    const carts = get().carts;
    const userCart = carts[userId] || [];
    set({ carts: { ...carts, [userId]: userCart.filter((item) => item.id !== productId) } });
  },

  // ✅ Added — increments quantity by 1
  increaseQty: (userId, productId) => {
    const carts = get().carts;
    const userCart = carts[userId] || [];
    set({
      carts: {
        ...carts,
        [userId]: userCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      },
    });
  },

  // ✅ Added — decrements quantity, removes item if it hits 0
  decreaseQty: (userId, productId) => {
    const carts = get().carts;
    const userCart = carts[userId] || [];
    const updated = userCart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    set({ carts: { ...carts, [userId]: updated } });
  },

  // ✅ Added — clears entire cart for a user
  clearCart: (userId) => {
    const carts = get().carts;
    set({ carts: { ...carts, [userId]: [] } });
  },

  addToFavorites: (userId, product) => {
    const favorites = get().favorites;
    const userFavorites = favorites[userId] || [];
    if (userFavorites.some((item) => item.id === product.id)) return;
    set({ favorites: { ...favorites, [userId]: [...userFavorites, product] } });
  },

  removeFromFavorites: (userId, productId) => {
    const favorites = get().favorites;
    const userFavorites = favorites[userId] || [];
    set({ favorites: { ...favorites, [userId]: userFavorites.filter((item) => item.id !== productId) } });
  },
}));

export default useCartStore;