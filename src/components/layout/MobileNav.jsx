import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import content from "@/assets/data/content.json";
import { allProducts } from "../../utils/product";
import useCartStore from "@/store/cartStore";

const MobileSidebar = ({
  isOpen,
  setIsOpen,
  search,
  setSearch,
  handleItemClick,
}) => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState(null);

  const cart = useCartStore((state) => state.cart);

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];

    return allProducts
      .filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 6);
  }, [search]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed md:hidden inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        className="fixed md:hidden top-0 left-0 w-3/4 h-full bg-white z-50 p-5 overflow-y-auto"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}>

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold">
            Clear<span className="text-pink-400">Skin</span>
          </h2>

          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="relative mt-10 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border rounded-full px-4 py-2 pr-10 outline-none"
          />

          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {search && (
          <div className="mb-5 bg-gray-50 rounded-xl overflow-hidden">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(
                      `/product/${product.slug || product.id}`
                    );
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="flex gap-3 p-3 hover:bg-pink-50 cursor-pointer transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 rounded object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {product.title}
                    </p>

                    <p className="text-pink-400 text-sm">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No products found
              </div>
            )}

          </div>
        )}

        <div className="flex flex-col gap-3">

          {content.icons.map((icon, idx) => (
            <div
              key={icon.id || idx}
              className="border rounded-xl px-3 py-3 bg-white shadow-sm"
            >

              <div className="flex items-center justify-between">

                <button
                  className="flex items-center gap-3"
                  onClick={() => {
                    if (icon.subItems?.[0]?.link) {
                      navigate(icon.subItems[0].link);
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-7 h-7"
                  />

                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize">
                      {icon.alt}
                    </span>

                    {icon.alt === "cart" && cartCount > 0 && (
                      <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </button>

                <button
                  onClick={() =>
                    setActiveIcon(
                      activeIcon === idx ? null : idx
                    )
                  }
                  className="text-lg font-bold cursor-pointer"
                >
                  {activeIcon === idx ? "−" : "+"}
                </button>

              </div>

              {activeIcon === idx && icon.subItems && (
                <div className="mt-3 ml-10 flex flex-col gap-2 border-l pl-3">

                  {icon.subItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleItemClick(item)}
                      className="text-left text-sm hover:text-pink-400 transition cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}

                </div>
              )}

            </div>
          ))}

        </div>

      </motion.div>
    </>
  );
};

export default MobileSidebar;