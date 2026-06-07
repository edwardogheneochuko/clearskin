import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ hero = [] }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index >= hero.length) setIndex(0);
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
    <div className="relative w-full h-screen overflow-hidden rounded-2xl">
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

          <div className="absolute inset-0 bg-linear-to-r from-black/35 via-black/20 to-transparent dark:from-black/80 dark:via-black/60 dark:to-black/20" />

          <motion.div
            className="absolute z-10 left-5 md:left-20 top-1/2 -translate-y-1/2 max-w-md"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1
              className="text-4xl md:text-5xl font-semibold leading-tight text-neutral-900 dark:text-pink-300"
              dangerouslySetInnerHTML={{ __html: current.title }}
            />

            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mt-5 leading-relaxed">
              {current.text}
            </p>

            <h3 className="mt-6 text-lg md:text-xl font-semibold text-neutral-900 dark:text-gray-100">
              {current.price}
            </h3>

            <motion.button
              onClick={() => navigate("/explore")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-7 py-3 tracking-wide rounded-md font-medium shadow-lg
              bg-black text-white
              hover:bg-green-900
              dark:bg-gray-400 dark:text-black
              dark:hover:bg-pink-900
              transition-all duration-300 cursor-pointer"
            >
              {current.buttonText}
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {hero.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {hero.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? "w-6 bg-white dark:bg-gray-100"
                  : "w-1.5 bg-white/50 dark:bg-white/30 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;