import React from "react";
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

  const sections = [
    { title: "Products", data: content.products },
    { title: "Under $25", data: content.under25Products },
  ];

  return (
    <div className="px-4 md:px-10 py-22">
      
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
                key={item.id || idx}
                item={item}
                index={idx}
                hero={false}
              />
            ))}
          </motion.div>
        </div>
      ))}

    </div>
  );
};

export default Explore;