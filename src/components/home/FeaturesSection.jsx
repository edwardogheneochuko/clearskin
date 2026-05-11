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

const FeaturesSection = ({ features = [] }) => {
  return (
    <motion.section
      className="mt-10 w-full px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-10 font-semibold"
      >
        Why Shop with Clear?
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
      >
        {features.map((item) => (
          <motion.article
            key={item.title}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.alt || item.title}
              loading="lazy"
              className="mx-auto mb-4 w-16 sm:w-20 md:w-24 object-contain"
            />

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
              {item.text}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;