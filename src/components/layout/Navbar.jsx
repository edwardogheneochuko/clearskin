import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/assets/data/content.json";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIcon, setActiveIcon] = useState(null);

  const allProducts = [
    ...content.products,
    ...content.under25Products,
  ];

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setActiveIcon(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm px-3 md:px-6 py-3 z-50">

      <div className="relative flex items-center justify-between">

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 cursor-pointer"
        >
          <img
            className="w-8"
            src="https://img.icons8.com/dotty/80/menu--v2.png"
            alt="menu"
          />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-3xl font-semibold">
          Clear<span className="text-pink-400">Skin</span>
        </h1>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          {content.navItems.map((item, i) => (
            <a
              key={i}
              href={`#${item.target}`}
              className="hover:text-pink-400 transition"
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
                className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
              />

              {icon.alt === "money" && (
                <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                  0.00
                </span>
              )}

              {icon.subItems && (
                <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                  {icon.subItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                        item.disabled ? "opacity-50 pointer-events-none" : ""
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
              className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 px-5 py-6 overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

              <div className="flex justify-end ">
                <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/comic/100/delete-sign.png"
                    alt="close"
                  />
                </button>
              </div>

              {/* LOGO */}
              <h1 className="text-3xl font-semibold mb-6 -mt-8">
                Clear<span className="text-pink-400">Skin</span>
              </h1>

              {/* MOBILE NAV ITEMS */}
              <div className="flex flex-col gap-3 mb-6 border-b pb-4">
                {content.navItems.map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.target}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium hover:text-pink-400"
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-full px-5 py-3"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="mb-6 border-b pb-4">

                {content.icons.map((icon, idx) => (
                  <div key={idx} className="border-b py-3">

                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setActiveIcon(activeIcon === idx ? null : idx)
                      }
                    >
                      <div className="flex items-center gap-3">

                        <img
                          src={icon.src}
                          className="w-7 h-7"
                          alt={icon.alt}
                        />

                        <span className="capitalize font-medium">
                          {icon.alt}
                        </span>

                      </div>

                      {icon.subItems && (
                        <span className="text-xl">
                          {activeIcon === idx ? "−" : "+"}
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {icon.subItems && activeIcon === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-10 mt-2 flex flex-col gap-2"
                        >
                          {icon.subItems.map((item, i) => (
                            <a
                              key={i}
                              href={item.link}
                              onClick={() => setIsOpen(false)}
                              className="text-sm hover:text-pink-400"
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                ))}

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;