import React from "react";
import { ShoppingBag, Star, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useCompareStore from "@/store/compareStore";

const ProductCard = ({ item, index, hero }) => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const userId = user?.uid || "guest";

  const cartsMap = useCartStore((state) => state.carts);
  const cart = cartsMap[userId] || [];
  const isInCart = cart.some((c) => c.id === item.id);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const favoritesMap = useCartStore((state) => state.favorites);
  const favorites = favoritesMap[userId] || [];
  const isFav = favorites.some((f) => f.id === item.id);
  const addToFavorites = useCartStore((state) => state.addToFavorites);
  const removeFromFavorites = useCartStore((state) => state.removeFromFavorites);

  // ✅ Compare store — reactive
  const compared = useCompareStore((s) => s.compared);
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const isInCompare = compared.some((p) => p.id === item.id);

  const requireAuth = (e, action) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    action();
  };

  const handleCartToggle = (e) => {
    if (item.inStock === false) {
      e.stopPropagation();
      return;
    }
    requireAuth(e, () => {
      if (isInCart) {
        removeFromCart(userId, item.id);
        toast("Removed from cart");
      } else {
        addToCart(userId, item);
        toast.success("Added to cart");
      }
    });
  };

  const handleFavToggle = (e) => {
    if (item.inStock === false) {
      e.stopPropagation();
      return;
    }
    requireAuth(e, () => {
      if (isFav) {
        removeFromFavorites(userId, item.id);
        toast("Removed from favorites");
      } else {
        addToFavorites(userId, item);
        toast.success("Added to favorites");
      }
    });
  };

  const handleCompare = (e) => {
    if (item.inStock === false) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    const result = addToCompare(item);
    if (result === "max") toast("Max 3 products to compare");
    else if (result === "exists") toast("Already in comparison");
    else toast.success("Added to compare chart");
  };

  const handleNavigate = (e) => {
    if (item.inStock === false) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
    const identifier = item.slug?.trim() || String(item.id);
    navigate(`/product/${identifier}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
    },
  };

  const actionIcons = [
    {
      icon: (
        <ShoppingBag
          size={22}
          className={isInCart ? "text-green-600" : ""}
        />
      ),
      key: "bag",
      action: handleCartToggle,
    },
    {
      icon: (
        <Star
          size={22}
          className={isFav ? "text-pink-500 fill-pink-500" : ""}
        />
      ),
      key: "star",
      action: handleFavToggle,
    },
    {
      icon: (
        <Repeat
          size={22}
          className={isInCompare ? "text-pink-500" : ""}
        />
      ),
      key: "repeat",
      action: handleCompare,
    },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-2xl
                 border border-gray-100 dark:border-gray-800
                 bg-white dark:bg-gray-900
                 p-3 sm:p-4
                 transition duration-300
                 hover:shadow-xl dark:hover:shadow-gray-900
                 ${item.inStock === false ? "opacity-60 grayscale" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-xl group ${item.inStock === false ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <img
          src={item.image}
          alt={item.title || "product"}
          onClick={handleNavigate}
          loading="lazy"
          className={`h-40 w-full rounded-xl object-cover transition duration-300 sm:h-44 md:h-64 ${item.inStock === false ? "group-hover:scale-100" : "group-hover:scale-105"} cursor-pointer`}
        />

        {item.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-black dark:bg-white px-2 py-1 text-[10px] text-white dark:text-black sm:text-xs">
            {item.badge}
          </span>
        )}

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

        <div className={`
          absolute right-2 top-2 flex flex-col gap-2
          opacity-100 translate-x-0
          md:opacity-0 md:translate-x-3
          transition-all duration-300
          md:group-hover:opacity-100 md:group-hover:translate-x-0
          ${item.inStock === false ? "pointer-events-none" : ""}`}
        >
          {actionIcons.map((iconData) => (
            <button
              key={iconData.key}
              onClick={iconData.action}
              disabled={item.inStock === false}
              className={`rounded-full
                         bg-white dark:bg-gray-800
                         p-2 shadow-md
                         text-black dark:text-white
                         transition cursor-pointer
                         hover:scale-110 hover:text-pink-500 dark:hover:text-pink-400
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {iconData.icon}
            </button>
          ))}
        </div>
      </div>

      {!hero && (
        <div className={`mt-2 space-y-1 sm:mt-3 ${item.inStock === false ? "text-gray-500 dark:text-gray-400" : ""}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {item.oldPrice && (
                <span className={`text-xs line-through sm:text-sm ${item.inStock === false ? "text-gray-400 dark:text-gray-500" : "text-gray-400 dark:text-gray-500"}`}>
                  ${item.oldPrice}
                </span>
              )}
              <span className={`text-base font-semibold sm:text-lg ${item.inStock === false ? "text-gray-600 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}>
                ${item.price}
              </span>
            </div>
          </div>

          <h3
            onClick={handleNavigate}
            className={`text-xs transition
                       sm:text-sm cursor-pointer
                       ${item.inStock === false
                         ? "text-gray-500 dark:text-gray-400"
                         : "text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white hover:text-pink-400 dark:hover:text-pink-400"
                       }`}
          >
            {item.title}
          </h3>

          <div className={`flex items-center gap-1.5 ${item.inStock === false ? "opacity-50" : ""}`}>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < item.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700"
                  }
                />
              ))}
            </div>
            {item.reviews && (
              <span className={`text-[10px] ${item.inStock === false ? "text-gray-400 dark:text-gray-500" : "text-gray-400 dark:text-gray-500"}`}>
                ({item.reviews.toLocaleString()})
              </span>
            )}
          </div>

          <button
            onClick={handleCartToggle}
            disabled={item.inStock === false}
            className={`
              mt-2 w-full rounded-lg py-2 text-xs cursor-pointer
              opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition sm:mt-3 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed
               ${isInCart
                ? "bg-red-600 text-white hover:bg-red-700"
                : item.inStock === false
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-black dark:bg-white text-white dark:text-black hover:bg-green-900 dark:hover:bg-gray-200"
              } `}
          >
           {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;