import { useState } from "react";
import { motion } from "framer-motion";
import navData from "@/assets/data/content.json";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm px-6 py-3 z-50">
      <div className="flex items-center justify-between w-full">
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
          <img width="40" height="40" src="https://img.icons8.com/dotty/80/menu--v2.png" alt="menu--v2"/>          </button>
        </div>

        <h1 className="font-semibold tracking-wide text-2xl font-roboto">
          Clear <span className="text-pink-400">Skin</span>
        </h1>

        <div className="hidden md:flex gap-6 font-roboto text-md">
          {navData.navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.title.toLowerCase()}`}
              className="hover:text-pink-400 transition">
              {item.title}
            </a>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <img
            className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
            src="https://img.icons8.com/dotty/80/person-male.png"
            alt="user"
          />
          <img
            className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
            src="https://img.icons8.com/comic/100/shopping-cart.png"
            alt="shopping-cart"
          />
         <img
         className="w-8 h-8 md:w-10 md:h-10 cursor-pointer transition duration-200 hover:brightness-0 hover:invert hover:sepia hover:hue-rotate-[330deg]"
         src="https://img.icons8.com/ios/50/hearts--v1.png"
         alt="heart"
         />

          <img className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" 
          src="https://img.icons8.com/ios/50/money-bag.png" alt="money-bag"/>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50 px-6 py-6"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded hover:bg-gray-100 transition cursor-pointer"
              >
             <img width="50" height="50" src="https://img.icons8.com/comic/100/delete-sign.png" alt="delete-sign"/>              </button>
            </div>

            <div className="mt-8 ml-5 flex flex-col">
              <h1 className="absolute top-10 text-3xl font-roboto">Clear</h1>
              {navData.navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={`#${item.title.toLowerCase()}`}
                  className="hover:text-pink-400 transition font-mono
                   font-medium mt-4 w-fit capitalize "
                  onClick={() => setIsOpen(false)}
                  variants={linkVariants}>
                  {item.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;