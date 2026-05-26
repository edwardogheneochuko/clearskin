import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const EssentialsSection = ({ essentials }) => {
  return (
    <motion.div
      className="my-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:mx-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {essentials.map((item, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
          className="relative overflow-hidden rounded-xl group shadow-sm dark:shadow-black/30"
        >
          <img
            src={item.image}
            alt={item.text || `essential-${index}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/60 dark:to-black/20 transition-all duration-300" />

          <div className="absolute top-10 left-10 p-2 z-10">
            <h1 className="font-semibold text-xl md:text-2xl text-black dark:text-white">
              {item.text}
            </h1>

            {item.price && (
              <p className="mt-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {item.price}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EssentialsSection;