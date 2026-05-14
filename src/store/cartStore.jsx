import { create } from "zustand";

const useCartStore = create((set, get) => ({
  carts: {},
  favorites: {},

  getCart: (userId) => {
    return get().carts[userId] || [];
  },

  getFavorites: (userId) => {
    return get().favorites[userId] || [];
  },

  addToCart: (userId, product) => {
    const carts = get().carts;
    const userCart = carts[userId] || [];

    const existing = userCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existing) {
      updatedCart = userCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...userCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    set({
      carts: {
        ...carts,
        [userId]: updatedCart,
      },
    });
  },

  removeFromCart: (userId, productId) => {
    const carts = get().carts;
    const userCart = carts[userId] || [];

    set({
      carts: {
        ...carts,
        [userId]: userCart.filter(
          (item) => item.id !== productId
        ),
      },
    });
  },

  addToFavorites: (userId, product) => {
    const favorites = get().favorites;
    const userFavorites =
      favorites[userId] || [];

    const exists = userFavorites.some(
      (item) => item.id === product.id
    );

    if (exists) return;

    set({
      favorites: {
        ...favorites,
        [userId]: [
          ...userFavorites,
          product,
        ],
      },
    });
  },

  removeFromFavorites: (
    userId,
    productId
  ) => {
    const favorites = get().favorites;
    const userFavorites =
      favorites[userId] || [];

    set({
      favorites: {
        ...favorites,
        [userId]: userFavorites.filter(
          (item) => item.id !== productId
        ),
      },
    });
  },
}));

export default useCartStore;