import React from "react";
import { motion } from "framer-motion";
import Text from "./ui/Text";
import ProductCard from "../components/ui/ProductCard";
import content from "../assets/data/content.json";

const Home = () => {
  const { essentials, products, under25Products } = content;

  return (
    <div className="mx-5">
      {/* SECTION 1 */}
      <div className="relative w-full h-screen md:h-auto overflow-hidden rounded-sm">
        <div className="absolute top-1/5 left-0 max-w-md mx-5 md:ml-30 md:mt-20 z-10">
          <h1 className="text-5xl md:text-6xl font-semibold">Clear Skin <br /> Simply Better.</h1>
          <p className="text-neutral-500 text-lg md:text-xl mt-5 tracking-wide font-medium">
            Thoughtfully formulated skincare made with clean ingredients for real, everyday results.
          </p>
          <h3 className="mt-8 text-xl font-semibold">Starting at $9.99</h3>
          <button className="mt-5 px-7 py-3 tracking-wide bg-black text-white rounded-sm hover:bg-green-900 duration-200 cursor-pointer">
            Shop Essentials
          </button>
        </div>
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253161/zzuelsmk55mrzmh99qfm.png"
          alt="preview"
        />
      </div>

      {/* SECTION 2 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:mx-5">
        {essentials.map((item, index) => (
          <motion.div key={index} className="relative overflow-hidden rounded-md group">
            <img
              src={item.image}
              alt={item.text || `essential-${index}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-10 left-10 p-2 text-black">
              <h1 className="font-semibold text-2xl md:text-3xl">{item.text}</h1>
              {item.price && <p className="mt-3 text-xl font-semibold">{item.price}</p>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTION 3 */}
      <div className="mt-10 md:mx-5">
        <Text title="Our Bestsellers" products="Shop All Products" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {products.slice(0, 4).map((item, index) => <ProductCard key={index} item={item} index={index} />)}
        </div>
      </div>

      <div className="mt-10">
        <Text title="Under $25" products="Shop All Products" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {under25Products.slice(0, 4).map((item, index) => <ProductCard key={index} item={item} index={index} />)}
        </div>
      </div>
      {/* SECTION 4 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="relative group overflow-hidden md:col-span-2 rounded-2xl shadow-lg h-96 sm:h-[28rem] xs:h-[24rem]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253161/zzuelsmk55mrzmh99qfm.png"
            alt="New Collection"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-opacity duration-500 group-hover:bg-black/20"></div>

          <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black max-w-xs md:max-w-sm">
            <motion.h3
              className="text-lg tracking-wide opacity-90 font-normal"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              NEW COLLECTION
            </motion.h3>

            <motion.h1
              className="text-3xl  font-semibold mt-2 "
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Clean Skincare for Healthy Everyday Skin
            </motion.h1>

            <motion.button
              className="mt-5 px-7 py-3 tracking-wide bg-white text-black rounded-sm
               hover:bg-neutral-900 hover:text-white transition duration-300 
               font-semibold cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Explore More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="relative group overflow-hidden col-span-1 rounded-2xl shadow-lg h-96 sm:h-[28rem] xs:h-[24rem]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <img
            src="https://res.cloudinary.com/direjlzc6/image/upload/v1775253143/cjxgajizleaobmwrovxf.jpg"
            alt="Sale"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-opacity duration-500 group-hover:bg-black/20"></div>

          <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black max-w-xs md:max-w-sm">
            <motion.h3
              className="text-3xl tracking-wide opacity-90 font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              25% off Everything
            </motion.h3>

            <motion.h1
              className=" mt-2 tracking-tighter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Makeup with extended range in colors for every human
            </motion.h1>

            <motion.button
              className="mt-5 px-7 py-3 tracking-wide bg-white text-black rounded-sm cursor-pointer
               hover:bg-neutral-900 hover:text-white transition duration-300 font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Shop Sale
            </motion.button>
          </div>
        </motion.div>
      </div>
      {/* Section 5 */}
    </div>
  );
};

export default Home;