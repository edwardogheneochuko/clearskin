import React, { useState } from "react";
import { ShoppingBag, Star, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useCartStore from "../../store/cartStore";

const ProductCard = ({ item, index, hero }) => {
  const [hovered, setHovered] = useState(false);

const addToCart = useCartStore((state) => state.addToCart);
const addToFavorites = useCartStore((state) => state.addToFavorites);
const favorites = useCartStore((state) => state.favorites);

const isFav = favorites.some((f) => f.id === item.id);
  
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
        size={24}
      />
    ),
    key: "bag",
    action: () => {
      addToCart(item);
      toast.success("Added to cart ");
    },
  },
  {
    icon: (
      <Star
        size={24}
        className={isFav ? "text-pink-500 fill-pink-500" : ""}
      />
    ),
    key: "star",
    action: () => {
      addToFavorites(item);
      toast.success("Added to favorites ");
    },
  },
  {
    icon: <Repeat size={24} />,
    key: "repeat",
    action: () => {
      toast("Compare feature coming soon");
    },
  },
];

  const iconVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group bg-white p-3 sm:p-4 rounded-2xl border 
      hover:shadow-xl transition duration-300 relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title || "hero"}
          className={`w-full h-40 sm:h-44 md:h-64 object-cover rounded-xl transition duration-300 transform-gpu ${
            hovered ? "scale-105" : ""
          }`}
        />

        {item.badge && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] sm:text-xs px-2 py-1 rounded-md">
            {item.badge}
          </span>
        )}

        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
          {actionIcons.map((iconData, i) => (
            <motion.button
              key={iconData.key}
              onClick={iconData.action}
              type="button"
              custom={i}
              variants={iconVariants}
              initial="hidden"
              animate={hovered ? "visible" : "hidden"}
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer text-black hover:text-green-900"
            >
              {iconData.icon}
            </motion.button>
          ))}
        </div>

        {hero && (
          <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white space-y-1 sm:space-y-2">
            {item.heroSubTitle && (
              <h3 className="text-xs sm:text-sm md:text-base">
                {item.heroSubTitle}
              </h3>
            )}
            {item.heroTitle && (
              <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold">
                {item.heroTitle}
              </h1>
            )}
            {item.heroButton && (
              <button 
              className="mt-2 sm:mt-3 px-5 sm:px-7 py-2 sm:py-3 tracking-wide bg-white text-black rounded-sm hover:bg-neutral-900 duration-200 cursor-pointer text-sm sm:text-base">
                {item.heroButton}
              </button>
            )}
          </div>
        )}
      </div>

      {!hero && (
        <div className="mt-2 sm:mt-3 space-y-1">
          <div className="flex items-center gap-2">
            {item.oldPrice && (
              <span className="line-through text-gray-400 text-xs sm:text-sm">
                ${item.oldPrice}
              </span>
            )}
            <span className="font-semibold text-black text-base sm:text-lg">
              ${item.price}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm text-gray-800 group-hover:text-black transition">
            {item.title}
          </h3>

          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < item.rating ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-gray-400 text-[10px] sm:text-xs">
              ({item.reviews})
            </span>
          </div>

          <button
            onClick={() => {
              addToCart(item)
              toast.success('Added to cart')
            }}
            className="mt-2 sm:mt-3 w-full py-2 text-xs sm:text-sm bg-black text-white rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition hover:bg-green-900 duration-300"
          >
            Add to Cart
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;