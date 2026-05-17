import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      addressesByUser: {},

      getAddresses: (userId) => get().addressesByUser[userId] || [],

      addAddress: (userId, address) => {
        const map = get().addressesByUser;
        const current = map[userId] || [];
        if (current.includes(address)) return;
        set({
          addressesByUser: {
            ...map,
            [userId]: [...current, address],
          },
        });
      },

      removeAddress: (userId, index) => {
        const map = get().addressesByUser;
        const current = map[userId] || [];
        set({
          addressesByUser: {
            ...map,
            [userId]: current.filter((_, i) => i !== index),
          },
        });
      },
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;