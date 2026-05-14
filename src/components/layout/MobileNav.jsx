import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import content from "@/assets/data/content.json";
import { allProducts } from "../../utils/product";
import useCartStore from "@/store/cartStore";

const MobileSidebar = ({
  isOpen,
  setIsOpen,
  search,
  setSearch,
  handleItemClick,
  user,
  logout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(null);

  const cart = useCartStore((state) => state.cart);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
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

  const icons = content.icons.map((icon) => {
    if (icon.alt === "user") {
      return {
        ...icon,
        subItems: user
          ? [
              // {
              //   label: user.email || "Account",
              //   link: null,
              //   type: "info",
              // },
              {
                label: "Logout",
                link: "/",
                type: "logout",
              },
            ]
          : icon.subItems,
      };
    }
    return icon;
  });

  const handleAction = (item) => {
    if (item.type === "logout") {
      logout?.();
      navigate("/");
      setIsOpen(false);
      return;
    }

    handleItemClick(item);
  };

  return (
    <>
      <div
        className="fixed md:hidden inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      <motion.aside
        className="fixed md:hidden top-0 left-0 w-[80%] sm:w-[70%] h-full bg-white z-50 p-5 overflow-y-auto"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl font-semibold"
          >
            Clear<span className="text-pink-400">Skin</span>
          </h2>

          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="relative mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border cursor-pointer rounded-full px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {search && (
          <div className="mb-6 bg-gray-50 rounded-xl overflow-hidden">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.slug || product.id}`);
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="flex gap-3 p-3 w-full hover:bg-pink-50"
                >
                  <img
                    src={product.image}
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
                </button>
              ))
            ) : (
              <p className="p-4 text-center text-sm text-gray-500">
                No products found
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {icons.map((icon, idx) => (
            <div
              key={icon.id || idx}
              className="border rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (icon.subItems?.[0]?.link) {
                      navigate(icon.subItems[0].link);
                      setIsOpen(false);
                    }
                  }}
                  className="flex items-center gap-3 w-full"
                >
                  <img src={icon.src} className="w-6 h-6" />

                  <div className="flex flex-col items-start">
                    <span className="capitalize font-medium">
                      {icon.alt}
                    </span>

                    {icon.alt === "user" && user && (
                      <span className="text-xs text-gray-500">
                        {user.name || user.email}
                      </span>
                    )}
                  </div>

                  {icon.alt === "cart" && cartCount > 0 && (
                    <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button className="cursor-pointer text-xl"
                  onClick={() =>
                    setActiveIcon(activeIcon === idx ? null : idx)
                  }>
                  {activeIcon === idx ? "−" : "+"}
                </button>
              </div>

              {activeIcon === idx && icon.subItems && (
                <div className="mt-3 ml-10 flex flex-col gap-2 border-l pl-3">
                  {icon.subItems.map((item, i) => {
                    const isLogout = item.label?.toLowerCase() === "logout"

                    return (
                    <button
                      key={i}
                      onClick={() => handleAction(item)}
                      className={
                        `w-fit rounded-lg px-4 py-2 text-left text-sm transition 
                        ${
                          isLogout 
                          ? "bg-red-800 cursor-pointer text-white hover:bg-red-700"
                          : "hover:text-pink-400"
                        }`
                      }
                    >
                      {item.label}
                    </button>
                    )
                })}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  );
};

export default MobileSidebar;