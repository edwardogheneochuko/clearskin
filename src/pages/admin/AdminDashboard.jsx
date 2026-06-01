import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, Users, ShoppingBag, LogOut, Menu, X,
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrder";
import AdminUsers from "./AdminUsers";
import AdminStats from "./AdminStats";

const NAV = [
  { label: "Overview", icon: LayoutDashboard, key: "stats"    },
  { label: "Products", icon: Package,         key: "products" },
  { label: "Orders",   icon: ShoppingBag,     key: "orders"   },
  { label: "Users",    icon: Users,           key: "users"    },
];

const AdminDashboard = () => {
  const [active, setActive]         = useState("stats");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logout   = useAuthStore((state) => state.logout);
  const user     = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const renderPage = () => {
    switch (active) {
      case "stats":    return <AdminStats />;
      case "products": return <AdminProducts />;
      case "orders":   return <AdminOrders />;
      case "users":    return <AdminUsers />;
      default:         return <AdminStats />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 flex flex-col
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Clear<span className="text-pink-400">Skin</span>
            <span className="ml-2 text-xs font-medium bg-pink-100 dark:bg-pink-950 text-pink-500 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </h1>
          <button
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActive(item.key); setSidebarOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer
                ${active === item.key
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

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-pink-500 font-bold text-sm">
              {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                       text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30
                       transition cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-gray-900
                           border-b border-gray-200 dark:border-gray-800
                           px-6 py-4 flex items-center gap-4
                           transition-colors duration-300">
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h2 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
            {NAV.find((n) => n.key === active)?.label}
          </h2>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;