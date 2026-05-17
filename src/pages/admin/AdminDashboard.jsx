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
  { label: "Overview",  icon: LayoutDashboard, key: "stats"    },
  { label: "Products",  icon: Package,          key: "products" },
  { label: "Orders",    icon: ShoppingBag,      key: "orders"   },
  { label: "Users",     icon: Users,            key: "users"    },
];

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
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Clear<span className="text-pink-400">Skin</span>
            <span className="ml-2 text-xs font-medium bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full">Admin</span>
          </h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
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
                  ? "bg-pink-50 text-pink-500"
                  : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-sm">
              {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "Admin"}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition cursor-pointer"
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

=      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h2 className="text-lg font-semibold capitalize">
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