import { X, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useSearchStore from "@/store/searchStore";

const RecentSearches = ({ onSelect, onClose, staticLayout = false }) => {
  const recentSearches = useSearchStore((s) => s.recentSearches);
  const removeSearch   = useSearchStore((s) => s.removeSearch);
  const clearSearches  = useSearchStore((s) => s.clearSearches);

  if (recentSearches.length === 0) return null;

  const containerClasses = `${staticLayout ? "mt-3 w-full" : "absolute top-full mt-2 w-full z-50"}
                 bg-white dark:bg-gray-900
                 border border-gray-100 dark:border-gray-800
                 rounded-2xl shadow-xl dark:shadow-gray-950
                 overflow-hidden`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className={containerClasses}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
          <Clock size={12} />
          Recent searches
        </div>
        <button
          onClick={clearSearches}
          className="text-xs text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="px-3 pb-3 flex flex-wrap gap-2">
        {recentSearches.map((term) => (
          <div
            key={term}
            className="flex items-center gap-1.5
                       bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       rounded-full px-3 py-1.5 group"
          >
            <TrendingUp size={11} className="text-pink-400 shrink-0" />
            <button
              onClick={() => { onSelect(term); onClose?.(); }}
              className="text-xs text-gray-700 dark:text-gray-300
                         hover:text-pink-400 dark:hover:text-pink-400
                         transition cursor-pointer"
            >
              {term}
            </button>
            <button
              onClick={() => removeSearch(term)}
              className="text-gray-300 dark:text-gray-600
                         hover:text-red-400 dark:hover:text-red-400
                         transition cursor-pointer ml-0.5"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSearches;