import React from "react";
import { ShoppingBag, Star, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

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

  const handleNavigate = (e) => {
    e.stopPropagation();
    const identifier = item.slug?.trim() || String(item.id);
    navigate(`/product/${identifier}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
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
      icon: <Repeat size={22} />,
      key: "repeat",
      action: (e) => {
        e.stopPropagation();
        toast("Compare feature coming soon");
      },
    },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border bg-white p-3 transition duration-300 hover:shadow-xl sm:p-4"
    >
      <div className="relative overflow-hidden rounded-xl group">
        <img
          src={item.image}
          alt={item.title || "product"}
          onClick={handleNavigate}
          loading="lazy"
          className="h-40 w-full rounded-xl object-cover transition duration-300 sm:h-44 md:h-64 group-hover:scale-105 cursor-pointer"
        />

        {item.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-black px-2 py-1 text-[10px] text-white sm:text-xs">
            {item.badge}
          </span>
        )}

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

        <div className="
          absolute right-2 top-2 flex flex-col gap-2
          opacity-100 translate-x-0
          md:opacity-0 md:translate-x-3
          transition-all duration-300
          md:group-hover:opacity-100 md:group-hover:translate-x-0
        ">
          {actionIcons.map((iconData) => (
            <button
              key={iconData.key}
              onClick={iconData.action}
              className="
                rounded-full bg-white p-2 shadow-md
                text-black transition cursor-pointer
                hover:scale-110 hover:text-pink-500
              "
            >
              {iconData.icon}
            </button>
          ))}
        </div>
      </div>

      {!hero && (
        <div className="mt-2 space-y-1 sm:mt-3">
          <div className="flex items-center gap-2">
            {item.oldPrice && (
              <span className="text-xs text-gray-400 line-through sm:text-sm">
                ${item.oldPrice}
              </span>
            )}
            <span className="text-base font-semibold sm:text-lg">
              ${item.price}
            </span>
          </div>

          <h3
            onClick={handleNavigate}
            className="text-xs text-gray-800 transition group-hover:text-black sm:text-sm cursor-pointer hover:text-pink-400"
          >
            {item.title}
          </h3>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                />
              ))}
            </div>
            {item.reviews && (
              <span className="text-[10px] text-gray-400">
                ({item.reviews.toLocaleString()})
              </span>
            )}
          </div>

          <button
            onClick={handleCartToggle}
            className={`
              mt-2 w-full rounded-lg py-2 text-xs cursor-pointer
              opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition sm:mt-3 sm:text-sm
              ${isInCart
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-black text-white hover:bg-green-900"
              }
            `}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;