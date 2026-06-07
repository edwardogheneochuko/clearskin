import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturesSection = ({ features = [] }) => {
  return (
    <motion.section
      className="mt-14 w-full px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl sm:text-3xl md:text-4xl mb-10 font-semibold
        text-gray-900 dark:text-pink-400"
      >
        Why Shop with Clear?
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
      >
        {features.map((item, index) => (
          <motion.article
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="text-center p-5 sm:p-6 rounded-3xl
            bg-white dark:bg-linear-to-br dark:from-gray-900 dark:to-gray-800
            shadow-md hover:shadow-xl
            border border-gray-100 dark:border-gray-800
            transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.alt || item.title}
              loading="lazy"
              className="mx-auto mb-5 w-16 sm:w-20 md:w-24 object-contain
              dark:opacity-90"
            />

            <h3
              className="text-lg sm:text-xl md:text-2xl font-semibold mb-2
              text-gray-900 dark:text-pink-300"
            >
              {item.title}
            </h3>

            <p
              className="text-sm sm:text-base leading-relaxed
              text-gray-600 dark:text-gray-300"
            >
              {item.text}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;