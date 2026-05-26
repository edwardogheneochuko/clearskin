// PromoSection.jsx
import { motion } from "framer-motion";

const leftCard = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const rightCard = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.15 } },
};

const PromoSection = () => {
  return (
    <div className="my-20 grid grid-cols-1 md:grid-cols-3 gap-6">

      <motion.div
        variants={leftCard}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative group overflow-hidden md:col-span-2 rounded-2xl shadow-lg dark:shadow-gray-900 h-96"
      >
        <img
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253161/zzuelsmk55mrzmh99qfm.png"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* ✅ Dark overlay */}
        <div className="absolute inset-0 bg-transparent dark:bg-black/40 transition-colors duration-300" />

        <div className="absolute top-1/2 left-6 -translate-y-1/2 z-10">
          <h3 className="text-sm tracking-widest opacity-80 text-black dark:text-gray-300">
            NEW COLLECTION
          </h3>
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            Clean Skincare for Healthy Everyday Skin
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 bg-white dark:bg-gray-900 text-black dark:text-white
                       px-6 py-2 rounded-sm
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       transition cursor-pointer"
          >
            Explore More
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        variants={rightCard}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative group overflow-hidden rounded-2xl shadow-lg dark:shadow-gray-900 h-96"
      >
        <img
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253143/cjxgajizleaobmwrovxf.jpg"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-transparent dark:bg-black/40 transition-colors duration-300" />

        <div className="absolute top-1/2 left-6 -translate-y-1/2 z-10">
          <h3 className="text-2xl font-semibold text-black dark:text-white">
            25% off Everything
          </h3>
          <p className="opacity-80 text-black dark:text-gray-300">
            Makeup with extended range
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 bg-white dark:bg-gray-900 text-black dark:text-white
                       px-6 py-2 rounded-sm
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       transition cursor-pointer"
          >
            Shop Sale
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
};

export default PromoSection;