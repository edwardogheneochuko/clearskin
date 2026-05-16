// store/authStore.js
import { create } from "zustand";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

export default useAuthStore;