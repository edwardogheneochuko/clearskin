import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            loading: true,

            setUser: (user) => set({ user }),
            setLoading: (loading) => set({ loading }),

            logout: async () => {
                await signOut(auth);
                set({ user: null }); 
            },
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore;