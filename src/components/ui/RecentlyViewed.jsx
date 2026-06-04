import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import useRecentStore from "@/store/recentStore";

const RecentlyViewed = () => {
  const navigate = useNavigate();
  const recentlyViewed = useRecentStore((s) => s.recentlyViewed);
  const clearRecent = useRecentStore((s) => s.clearRecent);

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="px-4 md:px-10 py-10 bg-white dark:bg-black text-gray-900 dark:text-gray-100 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-pink-400" />
          <h2 className="text-xl font-bold">
            Recently Viewed
          </h2>
        </div>

        <button
          onClick={clearRecent}
          className="text-xs text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() =>
              navigate(`/product/${product.slug || product.id}`)
            }
            className="group cursor-pointer"
          >
            <div
              className="overflow-hidden rounded-xl
              bg-gray-100 dark:bg-zinc-900
              mb-2"
            >
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-32 object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <p className="text-xs font-medium line-clamp-2 group-hover:text-pink-400 dark:group-hover:text-pink-400 transition">
              {product.title}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              ${product.price}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;