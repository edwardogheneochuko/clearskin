import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",

      toggleTheme: () => {
        const next =
          get().theme === "light" ? "dark" : "light";

        document.documentElement.classList.toggle(
          "dark",
          next === "dark"
        );

        set({ theme: next });
      },

      initTheme: () => {
        const savedTheme = get().theme;

        document.documentElement.classList.toggle(
          "dark",
          savedTheme === "dark"
        );
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;