import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import content from "@/assets/data/content.json";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    exit: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
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
            <img
              className="w-8 md:w-10"
              alt="menu"
            />
          </button>
        </div>

        <h1 className="font-semibold tracking-wide text-2xl font-roboto text-center mx-auto md:mx-0">
          Clear <span className="text-pink-400">Skin</span>
        </h1>

        <div className="hidden md:flex gap-6 font-roboto text-md">
          {content.navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.title.toLowerCase()}`}
              className="hover:text-pink-400 transition capitalize"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {content.icons.map((icon, idx) => (
  <div key={idx} className="relative">
    <img
      src={icon.src}
      alt={icon.alt}
      className={`w-8 h-8 md:w-10 md:h-10 cursor-pointer ${icon.class || ""}`}
    />

    {icon.alt === "money" && (
      <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
        0.00
      </span>
    )}
  </div>
))}
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 px-6 py-6"
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
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/comic/100/delete-sign.png"
                  alt="close"
                />
              </button>
            </div>

            <div className="mt-8 ml-5 flex flex-col relative">
              <h1 className="absolute -top-20 text-pink-400 text-3xl font-roboto">
                Clear
              </h1>

              <div>
                {content.navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={`#${item.title.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    variants={linkVariants}
                    className="block hover:text-pink-400 transition font-medium mt-4 w-fit capitalize"
                  >
                    {item.title}
                  </motion.a>
                ))}
              </div>

              <motion.div
                variants={linkVariants}
                className="flex gap-4 mt-6"
              >
                {content.icons.map((icon, idx) => (
  <div key={idx} className="relative">
    <img
      src={icon.src}
      alt={icon.alt}
      className={`w-8 h-8 md:w-10 md:h-10 cursor-pointer ${icon.class || ""}`}
    />

    {icon.alt === "money" && (
      <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
        0.00
      </span>
    )}
  </div>
))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;