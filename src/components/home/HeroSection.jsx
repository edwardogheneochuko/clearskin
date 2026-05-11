import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const HeroSection = ({ hero = [] }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index >= hero.length) {
      setIndex(0);
    }
  }, [hero.length]);

  useEffect(() => {
    if (!hero.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hero.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hero.length]);

  const current = hero[index];

  if (!current) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">

      <AnimatePresence mode="wait">

        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >

          <img
            src={current.image}
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            className="absolute z-10 left-5 md:left-20 top-1/2 -translate-y-1/2 max-w-md"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1
              className="text-5xl font-semibold leading-tight text-white"
              dangerouslySetInnerHTML={{ __html: current.title }}
            />

            <p className="text-gray-200 text-base md:text-lg mt-5">
              {current.text}
            </p>

            <h3 className="mt-6 text-lg md:text-xl font-semibold text-white">
              {current.price}
            </h3>

            <motion.button
              onClick={() => navigate("/explore")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-7 py-3 tracking-wide bg-black text-white rounded-sm hover:bg-green-900 duration-200 cursor-pointer"
            >
              {current.buttonText}
            </motion.button>
          </motion.div>

        </motion.div>

      </AnimatePresence>

    </div>
  );
};

export default HeroSection;