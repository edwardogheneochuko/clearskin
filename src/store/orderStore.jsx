import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      ordersByUser: {},

      addOrder: (userId, cart, total, shipping, address) => {
        const existing = get().ordersByUser[userId] || [];
        const newOrder = {
          id:        `ORD-${Date.now()}`,
          items:     cart,
          total,
          shipping,
          address,
          placedAt:  new Date().toISOString(),
          status:    "confirmed",
        };
        set({
          ordersByUser: {
            ...get().ordersByUser,
            [userId]: [newOrder, ...existing],
          },
        });
        return newOrder;
      },

      getOrders: (userId) => get().ordersByUser[userId] || [],

      clearOrders: (userId) => {
        const map = get().ordersByUser;
        const { [userId]: _, ...rest } = map;
        set({ ordersByUser: rest });
      },
    }),
    { name: "order-storage" }
  )
);

export default useOrderStore;