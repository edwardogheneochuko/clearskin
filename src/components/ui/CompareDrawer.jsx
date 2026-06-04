import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart2 } from "lucide-react";
import useCompareStore from "@/store/compareStore";
import CompareModal from "./CompareModal";

const CompareDrawer = () => {
  const compared = useCompareStore((s) => s.compared);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);

  if (compared.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-[9998]
                   bg-white dark:bg-gray-900
                   border-t border-gray-200 dark:border-gray-800
                   shadow-2xl px-4 py-3"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">

          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <BarChart2 size={18} className="text-pink-400 shrink-0" />

            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0">
              Comparing {compared.length}/3
            </span>

            <div className="flex gap-2">
              {compared.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2
                             bg-gray-50 dark:bg-gray-800
                             border border-gray-200 dark:border-gray-700
                             rounded-xl px-3 py-1.5"
                >
                  <img src={p.image} className="w-6 h-6 rounded-lg object-cover" />

                  <span className="text-xs truncate max-w-[100px]">
                    {p.title}
                  </span>

                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-gray-400 hover:text-red-400"
            >
              Clear
            </button>

            <CompareModal />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareDrawer;