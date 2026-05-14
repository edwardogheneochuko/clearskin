import React from "react";
import { ShoppingBag, Star, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";

const ProductCard = ({ item, index, hero }) => {
  // USER
  const user = useAuthStore((state) => state.user);
  const userId = user?.uid || "guest";

  // CART
  const addToCart = useCartStore((state) => state.addToCart);

  // FAVORITES
  const favoritesMap = useCartStore((state) => state.favorites);
  const favorites = favoritesMap[userId] || [];

  const isFav = favorites.some((f) => f.id === item.id);

  const addToFavorites = useCartStore((state) => state.addToFavorites);

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
      icon: <ShoppingBag size={22} />,
      key: "bag",
      action: () => {
        addToCart(userId, item);
        toast.success("Added to cart");
      },
    },
    {
      icon: (
        <Star
          size={22}
          className={isFav ? "text-pink-500 fill-pink-500" : ""}
        />
      ),
      key: "star",
      action: () => {
        addToFavorites(userId, item);
        toast.success("Added to favorites");
      },
    },
    {
      icon: <Repeat size={22} />,
      key: "repeat",
      action: () => {
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
          className="h-40 w-full rounded-xl object-cover transition duration-300 sm:h-44 md:h-64 group-hover:scale-105"
        />

        {item.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-black px-2 py-1 text-[10px] text-white sm:text-xs">
            {item.badge}
          </span>
        )}

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

        <div
          className="
            absolute right-2 top-2 flex flex-col gap-2
            opacity-0 translate-x-3
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-x-0
          "
        >
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

          <h3 className="text-xs text-gray-800 transition group-hover:text-black sm:text-sm">
            {item.title}
          </h3>

          <button
            onClick={() => {
              addToCart(userId, item);
              toast.success("Added to cart");
            }}
            className="
              mt-2 w-full rounded-lg bg-black py-2 text-xs text-white
              opacity-0 transition group-hover:opacity-100 cursor-pointer
              hover:bg-green-900 sm:mt-3 sm:text-sm
            "
          >
            Add to Cart
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;