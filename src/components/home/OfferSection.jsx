import { motion } from "framer-motion";
import Countdown from "../ui/Countdown";

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
  },
};

const OfferSection = () => {
  return (
    <div
      className="mt-16 grid md:grid-cols-4 gap-10 items-center
      overflow-x-hidden rounded-3xl p-6 md:p-10
      bg-gray-50 dark:bg-linear-to-r dark:from-gray-950 dark:to-gray-900"
    >
      <motion.div
        className="md:col-span-2 grid grid-cols-2 gap-4 overflow-hidden"
        variants={leftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          whileHover={{ scale: 1.04 }}
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253154/k91n0e6vhqxvbbh1sk13.jpg"
          alt="Bath oil"
          className="mt-8 w-5/6 h-5/6 object-cover mx-auto rounded-2xl shadow-lg"
        />

        <motion.img
          whileHover={{ scale: 1.04 }}
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253155/kypyu4pvew6fvstohrnh.jpg"
          alt="Product"
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />
      </motion.div>

      <motion.div
        className="md:text-center space-y-5 md:col-span-2"
        variants={rightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h4 className="text-sm tracking-[4px] font-semibold text-gray-700 dark:text-pink-400">
          SPECIAL OFFER
          <span className="ml-2 bg-pink-600 text-white px-4 py-1 rounded-full text-xs">
            -20%
          </span>
        </h4>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-pink-300">
          Mountain Pine Bath Oil
        </h2>

        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Made using clean, non-toxic ingredients designed for comfort,
          wellness, and everyday self-care.
        </p>

        <Countdown />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3 rounded-xl
          bg-black dark:bg-pink-500
          text-white font-medium
          hover:bg-pink-600
          shadow-lg transition-all"
        >
          Get Only $39.00
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OfferSection;