import React, { useState } from "react";
import { ShoppingBag, Star, Repeat } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ item, index, hero }) => {
  const [hovered, setHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" } },
  };

  const actionIcons = [
    { icon: <ShoppingBag size={24} />, key: "bag" },
    { icon: <Star size={24} />, key: "star" },
    { icon: <Repeat size={24} />, key: "repeat" },
  ];

  const iconVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, type: "spring", stiffness: 300 } }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group bg-white p-4 rounded-2xl border hover:shadow-xl transition duration-300 relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title || "hero"}
          className={`w-full h-44 md:h-64 object-cover rounded-xl transform transition duration-300 ${hovered ? "scale-105" : ""}`}
        />

        {item.badge && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
            {item.badge}
          </span>
        )}

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {actionIcons.map((iconData, i) => (
            <motion.div
              key={iconData.key}
              custom={i}
              variants={iconVariants}
              initial="hidden"
              animate={hovered ? "visible" : "hidden"}
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer text-black hover:text-green-900"
            >
              {iconData.icon}
            </motion.div>
          ))}
        </div>

        {/* Hero Overlay */}
        {hero && (
          <div className="absolute bottom-5 left-5 text-white space-y-2">
            {item.heroSubTitle && <h3 className="text-sm md:text-base">{item.heroSubTitle}</h3>}
            {item.heroTitle && <h1 className="text-2xl md:text-4xl font-semibold">{item.heroTitle}</h1>}
            {item.heroButton && (
              <button className="mt-3 px-7 py-3 tracking-wide bg-white text-black rounded-sm hover:bg-neutral-900 duration-200 cursor-pointer">
                {item.heroButton}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Details (hide for hero) */}
      {!hero && (
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2">
            {item.oldPrice && <span className="line-through text-gray-400 text-sm">${item.oldPrice}</span>}
            <span className="font-semibold text-black text-lg">${item.price}</span>
          </div>
          <h3 className="text-sm text-gray-800 group-hover:text-black transition">{item.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <span key={i}>{i < item.rating ? "★" : "☆"}</span>)}
            </div>
            <span className="text-gray-400 text-xs">({item.reviews})</span>
          </div>
          <button
            className="mt-3 w-full py-2 text-sm bg-black text-white rounded-lg cursor-pointer
          opacity-0 group-hover:opacity-100 transition hover:bg-green-900 duration-300"
          >
            Add to Cart
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;