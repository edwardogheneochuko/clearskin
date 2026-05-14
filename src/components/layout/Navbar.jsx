import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import content from "@/assets/data/content.json";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import MobileSidebar from "./MobileNav";
import { allProducts } from "@/utils/product";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] =
    useState(null);

  const [search, setSearch] = useState("");

  const [
    showSearchResults,
    setShowSearchResults,
  ] = useState(false);

  const [timeoutId, setTimeoutId] =
    useState(null);

  const navigate = useNavigate();

  // AUTH
  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  // CART
  const carts = useCartStore((state) => state.carts);

const cart =
  carts[user?.uid || "guest"] || [];

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];

    return allProducts.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const handleItemClick = (item) => {
    if (item?.link) {
      navigate(item.link);
    }

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

  const icons = content.icons.map((icon) => {
    if (icon.alt === "user") {
      return {
        ...icon,
        subItems: user
          ? [
              {
                label:
                  user.name ||
                  user.email,
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

  return (
    <nav className="fixed top-0 left-0 z-[9999] w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer md:hidden"
        >
          <Menu />
        </button>

        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-3xl font-semibold"
        >
          Clear
          <span className="text-pink-400">
            Skin
          </span>
        </h1>

        <div className="hidden gap-8 md:flex">
          {content.navItems.map((item, i) => (
            <a
              key={i}
              href={`#${item.target}`}
              className="transition hover:text-pink-400"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="relative">
            <input
              value={search}
              onFocus={() =>
                setShowSearchResults(true)
              }
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="w-64 rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
            />

            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            {showSearchResults &&
              search.trim() && (
                <div className="absolute top-full mt-3 max-h-96 w-full overflow-y-auto rounded-xl bg-white shadow-xl">
                  {filteredProducts.length >
                  0 ? (
                    filteredProducts.map(
                      (product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            navigate(
                              `/product/${
                                product.slug ||
                                product.id
                              }`
                            );

                            setSearch("");
                            setShowSearchResults(
                              false
                            );
                          }}
                          className="flex cursor-pointer gap-3 p-3 transition hover:bg-pink-50"
                        >
                          <img
                            src={product.image}
                            alt={
                              product.title
                            }
                            className="h-12 w-12 rounded object-cover"
                          />

                          <div>
                            <p className="text-sm">
                              {
                                product.title
                              }
                            </p>

                            <p className="text-pink-400">
                              $
                              {
                                product.price
                              }
                            </p>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p className="p-4 text-center text-sm text-gray-500">
                      No products found
                    </p>
                  )}
                </div>
              )}
          </div>

          {icons.map((icon, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() =>
                setActiveDropdown(idx)
              }
              onMouseLeave={() => {
                const id = setTimeout(
                  () =>
                    setActiveDropdown(
                      null
                    ),
                  300
                );

                setTimeoutId(id);
              }}
            >
              <button
                onClick={() =>
                  navigate(
                    icon.subItems?.[0]
                      ?.link || "/"
                  )
                }
                className={icon.class}
                onMouseEnter={() => {
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }

                  setActiveDropdown(idx);
                }}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="h-7 w-7"
                />
              </button>

              {icon.alt === "cart" &&
                cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                    {cartCount}
                  </span>
                )}

              {activeDropdown === idx &&
                icon.subItems && (
                  <div className="absolute right-0 top-full z-50 mt-2 min-w-[180px] rounded-xl bg-white p-2 shadow-xl">
                    {icon.subItems.map(
                      (item, i) => {
                        const isLogout =
                          item.type ===
                          "logout";

                        const isDisabled =
                          item.disabled;

                        return (
                          <button
                            key={i}
                            disabled={
                              isDisabled
                            }
                            onClick={() =>
                              handleAction(
                                item
                              )
                            }
                            className={`block w-full rounded-md px-4 py-2 text-left text-sm transition ${
                              isDisabled
                                ? "cursor-default text-gray-400"
                                : isLogout
                                ? "text-red-600 hover:bg-red-50"
                                : "hover:bg-pink-50"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      }
                    )}
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
          handleItemClick={
            handleItemClick
          }
          user={user}
          logout={logout}
        />
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;