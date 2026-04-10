import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen md:h-auto overflow-hidden rounded-sm md:mx-5">

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/5 left-0 max-w-md mx-5 md:ml-30 md:mt-20 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-semibold">
          Clear Skin <br /> Simply Better.
        </h1>

        <p className="text-neutral-500 text-lg md:text-xl mt-5 tracking-wide font-medium">
          Thoughtfully formulated skincare made with clean ingredients for real, everyday results.
        </p>

        <h3 className="mt-8 text-xl font-semibold">
          Starting at $9.99
        </h3>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5 px-7 py-3 tracking-wide bg-black text-white rounded-sm hover:bg-green-900 duration-200 cursor-pointer"
        >
          Shop Essentials
        </motion.button>
      </motion.div>

      <motion.img
        src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253161/zzuelsmk55mrzmh99qfm.png"
        alt="preview"
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
      />

    </div>
  );
};

export default HeroSection;