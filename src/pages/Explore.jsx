import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import content from "@/assets/data/content.json";
import ProductCard from "../components/ui/ProductCard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Explore = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const sections = [
    { title: "Essentials", data: content.essentials },
    { title: "Products", data: content.products },
    { title: "Under $25", data: content.under25Products },
  ];

  return (
    <div className="px-4 md:px-10 py-12">

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-10 flex items-center gap-x-4">
        <span>
            <ArrowLeft className="cursor-pointer duration-200 hover:text-gray-400"
            size={20} onClick={() => navigate('/')} />
        </span>
        Explore <span className="text-pink-400">ClearSkin</span>
      </motion.h1>

      {sections.map((section, i) => (
        <div key={i} className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">
            {section.title}
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {section.data?.map((item, idx) => (
              <ProductCard
                key={idx}
                item={item}
                index={idx}
                onAddToCart={addToCart}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Explore;