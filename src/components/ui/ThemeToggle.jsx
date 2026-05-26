import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import useThemeStore from "@/store/themeStore";

export default function ThemeToggle() {
  const theme       = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark      = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer
                 border border-gray-200 dark:border-gray-700
                 bg-gray-50 dark:bg-gray-800
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={15} className="text-yellow-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  90, opacity: 0, scale: 0.5 }}
            animate={{ rotate:   0, opacity: 1, scale: 1   }}
            exit={{    rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={15} className="text-gray-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}