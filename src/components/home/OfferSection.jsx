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
    <div className="mt-16 grid md:grid-cols-4 gap-10 items-center ">

      <motion.div
        className="md:col-span-2 grid grid-cols-2 gap-4"
        variants={leftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253154/k91n0e6vhqxvbbh1sk13.jpg"
          className="mt-8 w-5/6 h-5/6 object-cover items-center mx-auto"
        />

        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253155/kypyu4pvew6fvstohrnh.jpg"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="md:text-center space-y-5 md:col-span-2"
        variants={rightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h4 className="text-sm tracking-widest text-black font-semibold">
          SPECIAL OFFER{" "}
          <span className="bg-green-900 text-white px-4 py-1 font-display ml-1 rounded opacity-80">
            -20%
          </span>
        </h4>

        <h2 className="text-4xl md:text-5xl font-semibold mt-2">
          Mountain Pine Bath Oil
        </h2>

        <p className="text-gray-500 text-lg mt-2 font-medium">
          Made using clean ingredients, non-toxic ingredients, our products are designed for everyone.
        </p>

        <div className="mt-5">
          <Countdown />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-7 py-3 tracking-wide bg-black text-white rounded-sm hover:bg-green-900 duration-200 cursor-pointer"
        >
          Get Only $39.00
        </motion.button>
      </motion.div>

    </div>
  );
};

export default OfferSection;