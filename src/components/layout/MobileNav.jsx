import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import content from "@/assets/data/content.json";
import { allProducts } from "@/utils/product";
import useCartStore from "@/store/cartStore";
import { isAdmin } from "@/utils/adminConfig";

const MobileSidebar = ({
  isOpen, setIsOpen,
  search, setSearch,
  handleItemClick,
  user,
  logout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState(null);

  const carts = useCartStore((state) => state.carts);
  const cart = carts[user?.uid || "guest"] || [];

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
    if (!search.trim()) return [];
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6);
  }, [search]);

  const icons = content.icons.map((icon) => {
    if (icon.alt === "user") {
      return {
        ...icon,
        subItems: user
          ? isAdmin(user.email)
            ? [
                { label: user.name || user.email, type: "info", disabled: true },
                { label: "Admin Panel", link: "/admin",   type: "admin"  },
                { label: "Logout",      link: "/",        type: "logout" },
              ]
            : [
                { label: user.name || user.email, type: "info", disabled: true },
                { label: "My Profile",  link: "/profile", type: "profile" },
                { label: "My Orders",   link: "/cart",    type: "orders"  },
                { label: "Logout",      link: "/",        type: "logout"  },
              ]
          : [
              { label: "Login",  link: "/login",  type: "login"  },
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
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            <motion.aside
              key="sidebar"
              className="fixed top-0 left-0 z-50 h-full w-[80%] overflow-y-auto bg-white p-5 md:hidden sm:w-[70%]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2
                  onClick={() => { navigate("/"); handleClose(); }}
                  className="cursor-pointer text-2xl font-semibold"
                >
                  Clear<span className="text-pink-400">Skin</span>
                </h2>
                <button className="cursor-pointer" onClick={handleClose}>
                  <X size={22} />
                </button>
              </div>

              <div className="relative mb-5">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-pink-400"
                />
                <Search
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {search.trim() && (
                <div className="mb-6 overflow-hidden rounded-xl bg-gray-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          navigate(`/product/${product.slug || product.id}`);
                          handleClose();
                        }}
                        className="flex w-full gap-3 p-3 text-left transition hover:bg-pink-50"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div>
                          <p className="line-clamp-1 text-sm font-medium">{product.title}</p>
                          <p className="text-sm text-pink-400">${product.price}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="p-4 text-center text-sm text-gray-500">No products found</p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-3">
                {icons.map((icon, idx) => (
                  <div key={icon.id || idx} className="rounded-xl border px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
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
                            className="h-6 w-6 rounded-full object-cover ring-2 ring-pink-300"
                            alt="avatar"
                          />
                        ) : (
                          <img src={icon.src} alt={icon.alt} className="h-6 w-6" />
                        )}

                        <div className="flex flex-col items-start">
                          <span className="font-medium capitalize">{icon.alt}</span>
                          {icon.alt === "user" && user && (
                            <span className="text-xs text-gray-500 truncate max-w-[140px]">
                              {user.name || user.email}
                            </span>
                          )}
                        </div>

                        {icon.alt === "cart" && cartCount > 0 && (
                          <span className="ml-auto rounded-full bg-pink-500 px-2 py-0.5 text-xs text-white">
                            {cartCount}
                          </span>
                        )}
                      </button>

                      <button
                        className="cursor-pointer px-2 text-xl"
                        onClick={() => setActiveIcon(activeIcon === idx ? null : idx)}
                      >
                        {activeIcon === idx ? "−" : "+"}
                      </button>
                    </div>

                    {activeIcon === idx && icon.subItems && (
                      <div className="mt-3 ml-10 flex flex-col gap-2 border-l pl-3">
                        {icon.subItems.map((item, i) => {
                          const isLogout   = item.type === "logout";
                          const isDisabled = item.disabled;
                          return (
                            <button
                              key={i}
                              disabled={isDisabled}
                              onClick={() => handleAction(item)}
                              className={`w-fit rounded-lg px-4 py-2 text-left text-sm transition ${
                                isDisabled
                                  ? "cursor-default text-gray-400 text-xs"
                                  : isLogout
                                  ? "cursor-pointer bg-red-600 text-white hover:bg-red-700"
                                  : "hover:text-pink-400"
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSidebar;