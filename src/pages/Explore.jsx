import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PackageX, SlidersHorizontal } from "lucide-react";

import content from "@/assets/data/content.json";
import ProductCard from "@/components/ui/ProductCard";
import FilterPanel from "@/components/ui/FilterPanel";
import { ExploreSkeleton } from "@/components/ui/Skeleton";
import useFilterStore from "@/store/filterStore";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const allProductsCombined = [
  ...content.products.map((p)        => ({ ...p, category: "products" })),
  ...content.under25Products.map((p) => ({ ...p, category: "under25"  })),
];

const Explore = () => {
  const navigate = useNavigate();
  const [loading, setLoading]         = useState(true);
  const [filterOpen, setFilterOpen]   = useState(false);

  const { search, category, sortBy, minPrice, maxPrice, minRating } = useFilterStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let result = [...allProductsCombined];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter(
      (p) => p.price >= minPrice && p.price <= (maxPrice >= 100 ? Infinity : maxPrice)
    );

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case "price-asc":    result.sort((a, b) => a.price   - b.price);   break;
      case "price-desc":   result.sort((a, b) => b.price   - a.price);   break;
      case "rating-desc":  result.sort((a, b) => b.rating  - a.rating);  break;
      case "reviews-desc": result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return result;
  }, [search, category, sortBy, minPrice, maxPrice, minRating]);

  if (loading) return <ExploreSkeleton />;

  return (
    <div className="px-4 md:px-10 py-22">

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-x-2 mb-10 text-2xl font-bold cursor-pointer hover:text-gray-400 transition duration-200"
      >
        <ArrowLeft size={20} />
        Back to Home
      </motion.button>

      {/* ── Mobile filter trigger ─────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <p className="text-sm text-gray-500">{filtered.length} products</p>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white text-sm font-medium hover:bg-gray-50 transition cursor-pointer shadow-sm"
        >
          <SlidersHorizontal size={15} className="text-pink-400" />
          Filters
        </button>
      </div>

      {/* ── Layout ───────────────────────────────────────────── */}
      <div className="flex gap-8">

        <FilterPanel
          total={filtered.length}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1 min-w-0">
          {/* Desktop product count */}
          <p className="hidden md:block text-sm text-gray-400 mb-5">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <PackageX size={48} className="text-gray-200 mb-4" />
              <h2 className="text-lg font-semibold text-gray-600">No products found</h2>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filtered.map((item, idx) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  index={idx}
                  hero={false}
                />
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Explore;