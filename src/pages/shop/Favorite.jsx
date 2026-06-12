import React, { useState, useEffect } from "react";
import { Trash2, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import { FavoriteSkeleton } from "@/components/ui/Skeleton";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const Favorite = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const user = useAuthStore((state) => state.user);
  const userId = user?.uid || "guest";

  const favoritesMap = useCartStore((state) => state.favorites);
  const favorites = favoritesMap[userId] || [];

  const removeFromFavorites = useCartStore((state) => state.removeFromFavorites);

  const handleNavigate = (item) => {
    const identifier = item.slug?.trim() || String(item.id);
    navigate(`/product/${identifier}`);
  };

  if (loading) return <FavoriteSkeleton />;

  if (favorites.length === 0) {
    return (
      <>
        <PageHeader 
          title="My Favorites" 
          subtitle="Save and manage your favorite products"
        />
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center bg-skin-base dark:bg-skin-bg text-skin-text">
          <div className="mb-5 rounded-full bg-pink-100 dark:bg-pink-900/30 p-5">
            <Heart size={45} className="text-pink-500" />
          </div>
          <h1 className="text-2xl font-semibold sm:text-3xl">No Favorites Yet</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
            Products you favorite will appear here. Start building your wishlist!
          </p>
          <Link
            to="/explore"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition"
          >
            Explore Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="My Favorites" 
        subtitle="Your collection of favorite products"
      />
      <div className="px-4 py-12 sm:px-6 md:px-10 md:py-16 bg-skin-base dark:bg-skin-bg text-skin-text">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
            </h2>
          </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-3xl skin-panel transition duration-300 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title || "product"}
                onClick={() => handleNavigate(item)}
                loading="lazy"
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 cursor-pointer sm:h-64"
              />
            </div>

            <div className="p-5">
              <h2
                onClick={() => handleNavigate(item)}
                className="line-clamp-1 text-lg font-semibold sm:text-xl cursor-pointer hover:text-pink-400 transition"
              >
                {item.title}
              </h2>
              <p className="mt-2 text-lg font-bold text-pink-500">
                ${item.price}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
                {item.details}
              </p>

              <button
                onClick={() => removeFromFavorites(userId, item.id)}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-black dark:bg-white py-3 text-sm text-white dark:text-black transition duration-300 hover:bg-red-500 sm:text-base"
              >
                <Trash2 size={18} />
                Remove Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
        </div>
    </>
  );
};

export default Favorite;