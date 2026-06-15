import { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import content from "@/assets/data/content.json";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useAdminStore from "@/store/adminStore";
import MobileSidebar from "./MobileNav"
import { isAdmin } from "@/utils/adminConfig";
import ThemeToggle from "../ui/ThemeToggle";

import RecentSearches from "../ui/RecentSearches";
import useSearchStore from "@/store/searchStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showRecent, setShowRecent]               = useState(false);


  const timeoutRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const carts = useCartStore((state) => state.carts);
  const cart = carts[user?.uid || "guest"] || [];
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const allProducts = useAdminStore((state) => state.products);
  const addSearch = useSearchStore((s) => s.addSearch);

  const handleSearchSubmit = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    addSearch(trimmed);
    setShowSearchResults(true);
    setShowRecent(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
        setShowRecent(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];
    return allProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allProducts]);

    const handleSearchSelect = (term) => {
    setSearch(term);
    setShowRecent(false);
    setShowSearchResults(true);
  };

  const handleItemClick = (item) => {
    if (item?.link) navigate(item.link);
    setIsOpen(false);
    setActiveDropdown(null);
    setShowSearchResults(false);
  };

  const handleAction = (item) => {
    if (item.type === "logout") {
      logout();
      navigate("/");
      return;
    }
    handleItemClick(item);
  };

  const handleMouseEnterDropdown = (idx) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(idx);
  };

  const handleMouseLeaveDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 300);
  };

  const handleIconClick = (icon) => {
    if (icon.alt === "cart") {
      if (cartCount === 0) {
        toast("Your cart is empty 🛒");
        return;
      }
      navigate("/cart");
      return;
    }
    if (icon.alt === "user" && user) {
      navigate("/profile");
      return;
    }
    navigate(icon.subItems?.[0]?.link || "/");
  };

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

  return (
    <nav className="fixed top-0 left-0 z-9999 w-full
                 bg-skin-surface/95 dark:bg-skin-surface/95
                 backdrop-blur-md
                 border-b border-skin-border
                 shadow-sm transition-colors duration-300"
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer md:hidden
                     text-gray-700 dark:text-gray-200
                     hover:text-pink-400 dark:hover:text-pink-400 transition"
        >
          <Menu />
        </button>

        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-semibold
                     text-skin-accent-strong transition"
        >
          Clear<span className="text-skin-accent">Skin</span>
        </h1>

        <div className="hidden gap-8 md:flex">
          {content.navItems.map((item, i) => (
            <a
              key={i}
              href={`#${item.target}`}
              className="text-sm font-medium
                         text-gray-600 dark:text-gray-300
                         hover:text-pink-400 dark:hover:text-pink-400
                         transition"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <div className="relative" ref={searchRef}>
            <input
              value={search}
              onFocus={() => {
                setShowSearchResults(true);
                setShowRecent(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit(search);
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-56 lg:w-64 rounded-full
                         border border-gray-200 dark:border-gray-700
                         bg-gray-50 dark:bg-gray-900
                         text-gray-900 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         px-4 py-2 text-sm outline-none
                         focus:ring-2 focus:ring-pink-400
                         transition-all duration-200"
            />

            <Search
              size={15}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />

            {showSearchResults && search.trim() && (
              <div
                className="absolute top-full mt-3 max-h-96 w-full overflow-y-auto
                           rounded-2xl
                           bg-white dark:bg-gray-900
                           border border-gray-100 dark:border-gray-800
                           shadow-xl dark:shadow-gray-950 z-50"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        handleSearchSubmit(search);
                        navigate(
                          `/product/${product.slug || product.id}`
                        );
                        setSearch("");
                        setShowSearchResults(false);
                      }}
                      className="flex cursor-pointer gap-3 p-3 transition
                                 hover:bg-pink-50 dark:hover:bg-gray-800"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {product.title}
                        </p>
                        <p className="text-xs text-pink-400">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-sm text-gray-400 dark:text-gray-500">
                    No products found
                  </p>
                )}
              </div>
            )}

            {showRecent && !search.trim() && (
              <RecentSearches onSelect={handleSearchSelect} />
            )}
          </div>

          {icons.map((icon, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown(idx)}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                onClick={() => handleIconClick(icon)}
                className="p-2 rounded-full
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           transition duration-200 cursor-pointer"
              >
                {icon.alt === "user" && user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-pink-300"
                    alt="avatar"
                  />
                ) : (
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="h-7 w-7 dark:invert dark:opacity-80"
                  />
                )}
              </button>

              {icon.alt === "cart" && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white font-medium">
                  {cartCount}
                </span>
              )}

              {activeDropdown === idx && icon.subItems && (
                <div
                  className="absolute right-0 top-full z-50 mt-2 min-w-47.5
                             rounded-2xl
                             bg-white dark:bg-gray-900
                             border border-gray-100 dark:border-gray-800
                             p-2 shadow-xl dark:shadow-gray-950"
                >
                  {icon.subItems.map((item, i) => {
                    const isLogout = item.type === "logout";
                    const isDisabled = item.disabled;
                    const isProfile = item.type === "profile";
                    const isAdminType = item.type === "admin";

                    return (
                      <button
                        key={i}
                        disabled={isDisabled}
                        onClick={() => handleAction(item)}
                        className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm transition ${
                          isDisabled
                            ? "cursor-default text-gray-400 dark:text-gray-600 text-xs"
                            : isLogout
                            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                            : isProfile || isAdminType
                            ? "font-medium text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-500"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
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
      </div>

      <AnimatePresence>
        <MobileSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          search={search}
          setSearch={setSearch}
          handleItemClick={handleItemClick}
          user={user}
          logout={logout}
        />
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;