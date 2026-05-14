import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import content from "@/assets/data/content.json";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import MobileSidebar from "./MobileNav";
import { allProducts } from "../../utils/product";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const navigate = useNavigate();

  // CART
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // AUTH
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // SEARCH
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];
    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleItemClick = (item) => {
    if (item?.link) navigate(item.link);
    setIsOpen(false);
    setActiveDropdown(null);
    setShowSearchResults(false);
  };

  // 🔥 AUTH LOGIC FROM CONTENT.JSON (same style as mobile nav)
  const icons = content.icons.map((icon) => {
    if (icon.alt === "user") {
      return {
        ...icon,
        subItems: user
          ? [
              {
                label: user.name || user.email,
                type: "info",
                disabled: true,
              },
              {
                label: "Logout",
                type: "logout",
                link: "/",
              },
            ]
          : icon.subItems,
      };
    }
    return icon;
  });

  const handleAction = (item) => {
    if (item.type === "logout") {
      logout();
      navigate("/");
      return;
    }

    handleItemClick(item);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-[9999]">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden cursor-pointer"
        >
          <Menu />
        </button>

        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-semibold cursor-pointer"
        >
          Clear<span className="text-pink-400">Skin</span>
        </h1>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8">
          {content.navItems.map((item, i) => (
            <a
              key={i}
              href={`#${item.target}`}
              className="hover:text-pink-400"
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* SEARCH + ICONS */}
        <div className="hidden md:flex items-center gap-4">

          {/* SEARCH */}
          <div className="relative">
            <input
              value={search}
              onFocus={() => setShowSearchResults(true)}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-64 border rounded-full px-4 py-2 text-sm"
            />

            <Search className="absolute right-4 top-1/2 -translate-y-1/2" />

            {showSearchResults && search && (
              <div className="absolute top-full mt-3 w-full bg-white shadow-xl rounded-xl max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                      setSearch("");
                      setShowSearchResults(false);
                    }}
                    className="flex gap-3 p-3 hover:bg-pink-50 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      className="w-12 h-12 rounded"
                      alt=""
                    />
                    <div>
                      <p className="text-sm">{product.title}</p>
                      <p className="text-pink-400">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ICONS */}
          {icons.map((icon, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => {
                const id = setTimeout(() => setActiveDropdown(null), 300);
                setTimeoutId(id);
              }}
            >
              <button
                onClick={() =>
                  navigate(icon.subItems?.[0]?.link || "/")
                }
                className={icon.class}
                onMouseEnter={() => {
                  if (timeoutId) clearTimeout(timeoutId);
                  setActiveDropdown(idx);
                }}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="w-7 h-7"
                />
              </button>

              {/* CART BADGE */}
              {icon.alt === "cart" && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}

              {/* DROPDOWN */}
              {activeDropdown === idx && icon.subItems && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl p-2 min-w-[160px] z-50">
                  {icon.subItems.map((item, i) => {
                    const isLogout = item.type === "logout";

                    return (
                      <button
                        key={i}
                        onClick={() => handleAction(item)}
                        className={`block w-full text-left px-4 py-2 rounded-md text-sm transition ${
                          isLogout
                            ? "text-red-600 hover:bg-red-50"
                            : "hover:bg-pink-50"
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

      {/* MOBILE */}
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