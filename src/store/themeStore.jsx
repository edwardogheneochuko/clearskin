import { create } from "zustand";
import { persist } from "zustand/middleware";

export const getPreferredTheme = () => {
  try {
    const stored = localStorage.getItem("theme-storage");
    const savedTheme = stored ? JSON.parse(stored)?.state?.theme : null;
    return savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
};

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
        const resolved = getPreferredTheme();

        document.documentElement.classList.toggle(
          "dark",
          resolved === "dark"
        );

        set({ theme: resolved });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;