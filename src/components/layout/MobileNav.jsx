import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import content from "@/assets/data/content.json";
import useAdminStore from "@/store/adminStore";
import useCartStore from "@/store/cartStore";
import { isAdmin } from "@/utils/adminConfig";
import ThemeToggle from "../ui/ThemeToggle";

const MobileSidebar = ({
  isOpen,
  setIsOpen,
  search = "",
  setSearch,
  handleItemClick,
  user,
  logout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(null);

  const carts = useCartStore((state) => state.carts);
  const cart = carts[user?.uid || "guest"] || [];
  const allProducts = useAdminStore((state) => state.products);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  useEffect(() => {
    setIsOpen(false);
    setSearch("");
  }, [location.pathname, setIsOpen, setSearch]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen, setSearch]);

  const filteredProducts = useMemo(() => {
    const q = (search || "").trim();
    if (!q) return [];
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 6);
  }, [search, allProducts]);

  const icons = content.icons.map((icon) => {
    if (icon.alt === "user") {
      return {
        ...icon,
        subItems: user
          ? isAdmin(user.email)
            ? [
                { label: user.name || user.email, type: "info", disabled: true },
                { label: "Admin Panel", link: "/admin", type: "admin" },
                { label: "Logout", link: "/", type: "logout" },
              ]
            : [
                { label: user.name || user.email, type: "info", disabled: true },
                { label: "My Profile", link: "/profile", type: "profile" },
                { label: "My Orders", link: "/cart", type: "orders" },
                { label: "Logout", link: "/", type: "logout" },
              ]
          : [
              { label: "Login", link: "/login", type: "login" },
              { label: "Signup", link: "/signup", type: "signup" },
            ],
      };
    }
    return icon;
  });

  const handleAction = (item) => {
    if (item.type === "logout") {
      logout?.();
      navigate("/");
      handleClose();
      return;
    }
    handleItemClick(item);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.aside
            key="sidebar"
            className="fixed top-0 left-0 z-50 h-screen w-[80%] sm:w-[70%]
                       overflow-hidden md:hidden
                       bg-white dark:bg-gray-950
                       text-gray-900 dark:text-white
                       border-r border-gray-200 dark:border-gray-800
                       shadow-2xl transition-colors duration-300"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="h-full overflow-y-auto">

              <div className="sticky top-0 z-10 flex items-center justify-between
                              border-b border-gray-200 dark:border-gray-800
                              bg-white dark:bg-gray-950
                              px-5 py-5 transition-colors duration-300">
                <h2
                  onClick={() => {
                    navigate("/");
                    handleClose();
                  }}
                  className="cursor-pointer text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  Clear<span className="text-pink-400">Skin</span>
                </h2>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={handleClose}
                    className="cursor-pointer rounded-full p-2
                               text-gray-500 dark:text-gray-400
                               hover:bg-gray-100 dark:hover:bg-gray-800
                               hover:text-gray-900 dark:hover:text-white transition"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-5">

                <div className="relative">
                  <input
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-2xl
                               border border-gray-200 dark:border-gray-700
                               bg-gray-50 dark:bg-gray-900
                               px-4 py-3 pr-10
                               text-sm text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-500
                               outline-none transition-all duration-300
                               focus:ring-2 focus:ring-pink-400"
                  />
                  <Search
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  />
                </div>

                {(search || "").trim() && (
                  <div className="overflow-hidden rounded-2xl
                                  border border-gray-200 dark:border-gray-800
                                  bg-gray-50 dark:bg-gray-900">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            navigate(`/product/${product.slug || product.id}`);
                            handleClose();
                          }}
                          className="flex w-full gap-3 p-3 text-left transition
                                     hover:bg-pink-50 dark:hover:bg-gray-800"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            loading="lazy"
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-white">
                              {product.title}
                            </p>
                            <p className="mt-0.5 text-sm text-pink-400">
                              ${product.price}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No products found
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-1">
                  {content.navItems.map((item, i) => (
                    <a
                      key={i}
                      href={`#${item.target}`}
                      onClick={handleClose}
                      className="block px-4 py-2.5 rounded-xl text-sm font-medium
                                 text-gray-600 dark:text-gray-300
                                 hover:bg-pink-50 dark:hover:bg-gray-800
                                 hover:text-pink-400 dark:hover:text-pink-400
                                 transition"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800" />

                <div className="flex flex-col gap-3 pb-8">
                  {icons.map((icon, idx) => (
                    <div
                      key={icon.id || idx}
                      className="overflow-hidden rounded-2xl
                                 border border-gray-200 dark:border-gray-800
                                 bg-gray-50 dark:bg-gray-900
                                 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <button
                          onClick={() => {
                            if (icon.alt === "user" && user) {
                              navigate("/profile");
                              handleClose();
                              return;
                            }
                            if (icon.subItems?.[0]?.link) {
                              navigate(icon.subItems[0].link);
                              handleClose();
                            }
                          }}
                          className="flex w-full items-center gap-3"
                        >
                          {icon.alt === "user" && user?.photoURL ? (
                            <img
                              src={user.photoURL}
                              className="h-7 w-7 rounded-full object-cover ring-2 ring-pink-400"
                              alt="avatar"
                            />
                          ) : (
                            <img
                              src={icon.src}
                              alt={icon.alt}
                              className="h-6 w-6 dark:invert dark:opacity-90"
                            />
                          )}

                          <div className="flex flex-col items-start">
                            <span className="font-medium capitalize text-gray-900 dark:text-white">
                              {icon.alt}
                            </span>
                            {icon.alt === "user" && user && (
                              <span className="max-w-[140px] truncate text-xs text-gray-500 dark:text-gray-400">
                                {user.name || user.email}
                              </span>
                            )}
                          </div>

                          {icon.alt === "cart" && cartCount > 0 && (
                            <span className="ml-auto rounded-full bg-pink-500 px-2 py-0.5 text-xs font-medium text-white">
                              {cartCount}
                            </span>
                          )}
                        </button>

                        <button
                          className="ml-2 cursor-pointer rounded-lg px-2 text-xl
                                     text-gray-500 dark:text-gray-400
                                     hover:bg-gray-100 dark:hover:bg-gray-800
                                     hover:text-gray-900 dark:hover:text-white transition"
                          onClick={() =>
                            setActiveIcon(activeIcon === idx ? null : idx)
                          }
                        >
                          {activeIcon === idx ? "−" : "+"}
                        </button>
                      </div>

                      <AnimatePresence>
                        {activeIcon === idx && icon.subItems && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t border-gray-200 dark:border-gray-800"
                          >
                            <div className="flex flex-col gap-1 px-4 py-3">
                              {icon.subItems.map((item, i) => {
                                const isLogout = item.type === "logout";
                                const isDisabled = item.disabled;

                                return (
                                  <button
                                    key={i}
                                    disabled={isDisabled}
                                    onClick={() => handleAction(item)}
                                    className={`w-full rounded-xl px-4 py-2 text-left text-sm transition ${
                                      isDisabled
                                        ? "cursor-default text-xs text-gray-400 dark:text-gray-600"
                                        : isLogout
                                        ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-400"
                                    }`}
                                  >
                                    {item.label}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;