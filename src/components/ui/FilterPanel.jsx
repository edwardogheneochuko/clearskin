import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useFilterStore from "@/store/filterStore";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "reviews-desc", label: "Most Reviewed" },
];

const CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "products", label: "Full Size" },
  { value: "under25", label: "Under $25" },
];

const RATINGS = [1, 2, 3, 4, 5];

const FilterContent = () => {
  const {
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    resetFilters,
  } = useFilterStore();

  const isFiltered =
    category !== "all" ||
    sortBy !== "default" ||
    minPrice !== 0 ||
    maxPrice !== 100 ||
    minRating !== 0 ||
    search !== "";

  return (
    <div className="space-y-6">
      {isFiltered && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 cursor-pointer transition"
        >
          <X size={12} />
          Reset all filters
        </button>
      )}

      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-2">
          Search
        </label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 text-sm outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-2">
          Category
        </label>

        <div className="flex flex-col gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition cursor-pointer
                ${
                  category === c.value
                    ? "bg-pink-50 dark:bg-pink-500/20 text-pink-500 border border-pink-200 dark:border-pink-500/30"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-2">
          Sort By
        </label>

        <div className="flex flex-col gap-2">
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition cursor-pointer
                ${
                  sortBy === s.value
                    ? "bg-pink-50 dark:bg-pink-500/20 text-pink-500 border border-pink-200 dark:border-pink-500/30"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            Price Range
          </label>

          <span className="text-xs text-gray-400 dark:text-zinc-500">
            ${minPrice} — {maxPrice >= 100 ? "$100+" : `$${maxPrice}`}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={minPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < maxPrice) setMinPrice(val);
            }}
            className="w-full accent-pink-400 cursor-pointer"
          />

          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={maxPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > minPrice) setMaxPrice(val);
            }}
            className="w-full accent-pink-400 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-zinc-400 block mb-2">
          Min Rating
        </label>

        <div className="flex gap-1">
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition cursor-pointer border
                ${
                  minRating === r
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 border-transparent hover:border-pink-300 dark:hover:border-pink-500/40"
                }`}
            >
              {r}★
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterPanel = ({ total, isOpen, onClose }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              key="drawer"
              className="fixed top-0 right-0 z-50 h-full w-[80%] sm:w-[360px] bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={16}
                    className="text-pink-400"
                  />

                  <span className="font-semibold text-sm text-gray-900 
                  dark:text-gray-300">
                    Filters
                  </span>

                  {total !== undefined && (
                    <span className="text-xs text-gray-400 dark:text-zinc-500">
                      ({total})
                    </span>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden md:block w-56 shrink-0">
        <div className="sticky top-28 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal
              size={16}
              className="text-pink-400"
            />

            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              Filters
            </span>

            {total !== undefined && (
              <span className="text-xs text-gray-400 dark:text-zinc-500">
                ({total})
              </span>
            )}
          </div>

          <FilterContent />
        </div>
      </div>
    </>
  );
};

export default FilterPanel;