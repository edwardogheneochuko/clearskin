import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PackageX, SlidersHorizontal } from "lucide-react";

import ProductCard from "@/components/ui/ProductCard";
import FilterPanel from "@/components/ui/FilterPanel";
import PageHeader from "@/components/layout/PageHeader";
import { ExploreSkeleton } from "@/components/ui/Skeleton";
import useFilterStore from "@/store/filterStore";
import useAdminStore from "@/store/adminStore";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Get products from admin store instead of static JSON
  const allProductsCombined = useAdminStore((s) => s.products);

  const { search, category, sortBy, minPrice, maxPrice, minRating, inStock } =
    useFilterStore();

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
      (p) =>
        p.price >= minPrice &&
        p.price <= (maxPrice >= 100 ? Infinity : maxPrice)
    );

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (inStock) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews-desc":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [allProductsCombined, search, category, sortBy, minPrice, maxPrice, minRating, inStock]);

  if (loading) return <ExploreSkeleton />;

  return (
    <>
      <PageHeader 
        title="Shop All Products" 
        subtitle="Discover our complete collection of skincare essentials"
        bgImage={true}
      />
      <div className="px-4 md:px-10 py-12 bg-skin-base dark:bg-skin-bg min-h-screen">
        <div className="flex items-center justify-between mb-6 md:hidden">
          <p className="text-sm text-black dark:text-zinc-300">
            {filtered.length} products
          </p>

          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border
            bg-white dark:bg-zinc-900
            text-sm font-medium
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition cursor-pointer shadow-sm
            border-gray-200 dark:border-zinc-800"
          >
            <SlidersHorizontal size={15} className="text-pink-400" />
            <span className="dark:text-white">Filters</span>
          </button>
        </div>

      <div className="flex gap-8">
        <FilterPanel
          total={filtered.length}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <p className="hidden md:block text-sm text-gray-400 dark:text-zinc-500 mb-5">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <PackageX size={48} className="text-gray-300 dark:text-zinc-700 mb-4" />

              <h2 className="text-lg font-semibold text-gray-600 dark:text-zinc-300">
                No products found
              </h2>

              <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">
                Try adjusting your filters
              </p>
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
    </>
  );
};

export default Explore;