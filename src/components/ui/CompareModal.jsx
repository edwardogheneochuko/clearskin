import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCompareStore from "@/store/compareStore";

const ROWS = [
  { label: "Price", key: "price", render: (v) => `$${v}` },
  {
    label: "Rating",
    key: "rating",
    render: (v, product) => (
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={11}
            className={
              i < v
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-700 fill-gray-200 dark:fill-gray-700"
            }
          />
        ))}
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
          ({product.reviews?.toLocaleString() || 0})
        </span>
      </div>
    ),
  },
  { label: "Category", key: "category", render: (v) => v || "—" },
  {
    label: "Details",
    key: "details",
    render: (v) => (
      <span className="line-clamp-3 text-gray-700 dark:text-gray-300">
        {v || "—"}
      </span>
    ),
  },
];

const CompareModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const compared = useCompareStore((s) => s.compared);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={compared.length < 2}
        className="
          px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition
          bg-black dark:bg-white text-white dark:text-black
          hover:bg-neutral-800 dark:hover:bg-gray-200
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Compare Now
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" fixed inset-0 z-[9999] bg-black/60 dark:bg-black/70
              backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className=" w-full max-w-4xl max-h-[85vh] overflow-y-auto
                bg-white dark:bg-zinc-900
                border border-gray-200 dark:border-gray-800
                rounded-3xl shadow-2xl " >

              <div className="
                sticky top-0 z-10
                bg-white dark:bg-zinc-900
                border-b border-gray-100 dark:border-gray-800
                px-6 py-4 flex items-center justify-between
              ">
                <div className="flex items-center gap-2">
                  <BarChart2 size={18} className="text-pink-400" />
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    Product Comparison
                  </h2>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    p-1.5 rounded-full
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition cursor-pointer
                    text-gray-500 dark:text-gray-400
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-400 dark:text-gray-500 pb-4 pr-4 w-28">
                        Product
                      </th>

                      {compared.map((p) => (
                        <th key={p.id} className="pb-4 px-3 text-center align-top">
                          <div className="relative inline-block">
                            <button
                              onClick={() => removeFromCompare(p.id)}
                              className="
                                absolute -top-1 -right-1 w-5 h-5 rounded-full
                                bg-gray-200 dark:bg-gray-700
                                flex items-center justify-center
                                text-gray-500 dark:text-gray-300
                                hover:bg-red-100 dark:hover:bg-red-950/40
                                hover:text-red-400 transition cursor-pointer z-10
                              "
                            >
                              <X size={10} />
                            </button>

                            <img
                              src={p.image}
                              loading="lazy"
                              onClick={() => {
                                navigate(`/product/${p.slug || p.id}`);
                                setIsOpen(false);
                              }}
                              className="
                                w-24 h-24 rounded-2xl object-cover mx-auto
                                cursor-pointer hover:opacity-90 transition
                              "
                            />
                          </div>

                          <p
                            onClick={() => {
                              navigate(`/product/${p.slug || p.id}`);
                              setIsOpen(false);
                            }}
                            className="
                              mt-2 text-xs font-semibold
                              text-gray-800 dark:text-gray-100
                              line-clamp-2 cursor-pointer
                              hover:text-pink-400 transition text-center
                            "
                          >
                            {p.title}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {ROWS.map((row, i) => (
                      <tr
                        key={row.key}
                        className={
                          i % 2 === 0
                            ? "bg-gray-50 dark:bg-gray-800/40"
                            : "bg-white dark:bg-zinc-900"
                        }
                      >
                        <td className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 rounded-l-xl">
                          {row.label}
                        </td>

                        {compared.map((p) => (
                          <td
                            key={p.id}
                            className="px-3 py-3 text-center text-xs text-gray-700 dark:text-gray-300 last:rounded-r-xl"
                          >
                            {row.render
                              ? row.render(p[row.key], p)
                              : p[row.key] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FOOTER */}
              <div className="px-6 pb-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    clearCompare();
                    setIsOpen(false);
                  }}
                  className="
                    px-4 py-2 rounded-xl text-sm
                    border border-gray-200 dark:border-gray-700
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    transition cursor-pointer
                  "
                >
                  Clear All
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    px-4 py-2 rounded-xl text-sm
                    bg-black dark:bg-white
                    text-white dark:text-black
                    hover:bg-neutral-800 dark:hover:bg-gray-200
                    transition cursor-pointer
                  "
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompareModal;