import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import useAuthStore from "@/store/authStore";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrder";
import AdminUsers from "./AdminUsers";
import AdminStats from "./AdminStats";
import ThemeToggle from "../../components/ui/ThemeToggle";

const NAV = [
  { label: "Overview", icon: LayoutDashboard, key: "stats" },
  { label: "Products", icon: Package, key: "products" },
  { label: "Orders", icon: ShoppingBag, key: "orders" },
  { label: "Users", icon: Users, key: "users" },
];

const PAGES = {
  stats: AdminStats,
  products: AdminProducts,
  orders: AdminOrders,
  users: AdminUsers,
};

const AdminDashboard = () => {
  const [active, setActive] = useState("stats");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const Page = PAGES[active] || AdminStats;

  const activeLabel = useMemo(() => {
    return NAV.find((n) => n.key === active)?.label || "Overview";
  }, [active]);

  const handleNavClick = (key) => {
    setActive(key);

    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const userInitial = useMemo(() => {
    return (
      (user?.name?.trim()?.[0] ||
        user?.email?.trim()?.[0] ||
        "A")?.toUpperCase()
    );
  }, [user]);

  return (
    <div className="flex min-h-screen md:fixed md:inset-0 md:h-screen md:w-full md:overflow-hidden bg-skin-base dark:bg-skin-bg transition-colors duration-300">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col
          bg-skin-surface dark:bg-skin-surface
          border-r border-skin-border
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="p-6 border-b border-skin-border flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Clear<span className="text-pink-400">Skin</span>
            <span className="ml-2 text-xs font-medium bg-pink-100 dark:bg-pink-950 text-pink-500 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </h1>

          <button
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                ${
                  active === item.key
                    ? "bg-pink-50 dark:bg-pink-950/40 text-pink-500"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-skin-border space-y-4">

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-pink-400 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                {userInitial}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm
                       text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">

        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {activeLabel}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Page /> 
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;