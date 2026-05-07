import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/assets/data/content.json";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setActiveDropdown(null);
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
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <nav className="fixed top-0 w-full shadow-sm px-3 md:px-6 py-3 z-50 bg-white">
      <div className="flex items-center justify-between w-full">
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            <img
              className="w-8 md:w-10"
              src="https://img.icons8.com/dotty/80/menu--v2.png"
              alt="menu"
            />
          </button>
        </div>

        <h1 className="font-semibold tracking-wide text-3xl md:text-4xl text-center mx-auto md:mx-0">
          Clear<span className="text-pink-400">Skin</span>
        </h1>

        <div className="hidden md:flex gap-6 font-text text-md">
          {content.navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.title.toLowerCase()}`}
              className="hover:text-pink-400 hover:underline transition capitalize"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {content.icons.map((icon, idx) => (
            <div key={idx} className="relative group">
              <img
                src={icon.src}
                alt={icon.alt}
                className={`w-8 h-8 md:w-10 md:h-10 cursor-pointer ${
                  icon.class || ""
                }`}
              />

              {icon.alt === "money" && (
                <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                  0.00
                </span>
              )}

              {icon.subItems && (
                <div
                  className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg z-50 overflow-hidden
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  border border-gray-100 transition-all duration-200 ease-out
                  translate-y-2 group-hover:translate-y-0"
                >
                  {icon.subItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 font-serif ${
                        item.disabled
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 px-6 py-6 overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-end relative z-[60]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer relative z-[70]"
                >
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/comic/100/delete-sign.png"
                    alt="close"
                  />
                </button>
              </div>

              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold mb-9 -mt-10">
                  Clear<span className="text-pink-400">Skin</span>
                </h1>

                <div>
                  {content.navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      variants={linkVariants}
                      href={`#${item.title.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="block hover:text-pink-400 font-text transition font-medium mt-2 capitalize"
                    >
                      {item.title}
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  className="flex flex-col gap-4 mt-8"
                  variants={linkVariants}
                >
                  {content.icons.map((icon, idx) => (
                    <div key={idx} className="border-b pb-3">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          icon.subItems
                            ? setActiveDropdown(
                                activeDropdown === idx ? null : idx
                              )
                            : null
                        }
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={icon.src}
                            alt={icon.alt}
                            className="w-8 h-8"
                          />

                          <span className="capitalize font-medium">
                            {icon.alt}
                          </span>
                        </div>

                        {icon.subItems && (
                          <span className="text-xl">
                            {activeDropdown === idx ? "−" : "+"}
                          </span>
                        )}
                      </div>

                      {icon.alt === "money" && (
                        <div className="mt-2 text-sm text-gray-600">
                          Balance: ₦0.00
                        </div>
                      )}

                      <AnimatePresence>
                        {icon.subItems &&
                          activeDropdown === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-3 ml-11 flex flex-col"
                            >
                              {icon.subItems.map((item, i) => (
                                <a
                                  key={i}
                                  href={item.link}
                                  className={`py-2 text-sm hover:text-pink-400 ${
                                    item.disabled
                                      ? "opacity-50 pointer-events-none"
                                      : ""
                                  }`}
                                >
                                  {item.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;