import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Sparkles } from "lucide-react";

const InstallPrompt = () => {
  const [prompt, setPrompt]   = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setPrompt(null);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{    y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[9997]
                     w-[calc(100%-2rem)] max-w-sm
                     bg-white dark:bg-gray-900
                     border border-gray-200 dark:border-gray-800
                     rounded-2xl shadow-xl px-4 py-3
                     flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-pink-400" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Install ClearSkin
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Add to home screen for quick access
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                         bg-black dark:bg-white text-white dark:text-black
                         text-xs font-medium hover:bg-neutral-800 dark:hover:bg-gray-200
                         transition cursor-pointer"
            >
              <Download size={12} />
              Install
            </button>
            <button
              onClick={() => setVisible(false)}
              className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800
                         text-gray-400 transition cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;