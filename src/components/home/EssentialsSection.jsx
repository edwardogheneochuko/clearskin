import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
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
          className="relative overflow-hidden rounded-md group"
        >
          <img
            src={item.image}
            alt={item.text || `essential-${index}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-10 left-10 p-2 text-black">
            <h1 className="font-semibold text-2xl md:text-3xl">
              {item.text}
            </h1>

            {item.price && (
              <p className="mt-3 text-xl font-semibold">
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