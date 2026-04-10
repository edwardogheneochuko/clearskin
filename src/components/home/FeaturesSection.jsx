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

const FeaturesSection = ({ features }) => {
  return (
    <motion.div
      className="mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl mb-10 font-semibold"
      >
        Why Shop with Clear?
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {features.map((item, index) => (
          <motion.article
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center p-4"
          >
            <img
              src={item.image}
              className="mx-auto mb-4 w-25"
              alt={item.title}
            />

            <h3 className="text-2xl font-semibold">
              {item.title}
            </h3>

            <p className="text-neutral-500">
              {item.text}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeaturesSection;