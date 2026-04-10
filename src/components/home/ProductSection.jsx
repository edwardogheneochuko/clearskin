import React from "react";
import { motion } from "framer-motion";
import ProductCard from "../ui/ProductCard";
import Text from "../ui/Text";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProductSection = ({ title, products }) => {
  return (
    <div className="mt-10 md:mx-5">
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Text title={title} products="Shop All Products" />
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {products.slice(0, 4).map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ProductCard item={item} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductSection;