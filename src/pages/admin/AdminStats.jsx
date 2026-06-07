import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";
import useAdminStore from "@/store/adminStore";
import useCartStore from "@/store/cartStore";

const COLORS = ["#ec4899", "#f97316", "#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg text-xs">
      {label && <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.name === "Revenue" ? `$${p.value.toFixed(2)}` : p.value}
        </p>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon size={20} />
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
  </div>
);

const AdminStats = () => {
  const products = useAdminStore((s) => s.products);
  const carts    = useCartStore((s) => s.carts);

  const allOrders = Object.entries(carts)
    .filter(([, items]) => items.length > 0)
    .map(([userId, items]) => ({
      userId,
      items,
      total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      qty:   items.reduce((acc, i) => acc + i.quantity, 0),
    }));

  const totalRevenue = allOrders.reduce((acc, o) => acc + o.total, 0);
  const totalUsers   = Object.keys(carts).length;
  const totalOrders  = allOrders.length;

  const revenueData = allOrders.map((o, i) => ({
    name:    `Order ${i + 1}`,
    Revenue: parseFloat(o.total.toFixed(2)),
    Items:   o.qty,
  }));

  const categoryCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name: name === "under25" ? "Under $25" : "Full Size",
    value,
  }));

  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 6)
    .map((p) => ({
      name:  p.title.length > 20 ? p.title.slice(0, 20) + "…" : p.title,
      Price: p.price,
    }));

  const weeklyData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({
    day,
    Revenue: parseFloat((totalRevenue * (0.1 + Math.sin(i) * 0.05 + i * 0.02)).toFixed(2)),
  }));

  const stats = [
    { label: "Total Revenue",  value: `$${totalRevenue.toFixed(2)}`, icon: TrendingUp,  color: "bg-green-50 dark:bg-green-950/40 text-green-500"  },
    { label: "Total Orders",   value: totalOrders,                   icon: ShoppingBag, color: "bg-blue-50 dark:bg-blue-950/40 text-blue-500"     },
    { label: "Total Products", value: products.length,               icon: Package,     color: "bg-pink-50 dark:bg-pink-950/40 text-pink-500"     },
    { label: "Total Users",    value: totalUsers,                    icon: Users,       color: "bg-purple-50 dark:bg-purple-950/40 text-purple-500"},
  ];

  const chartCard = "bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5";
  const chartTitle = "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4";

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className={chartCard}>
        <p className={chartTitle}>Weekly Revenue Trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ec4899" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Revenue" stroke="#ec4899" strokeWidth={2} fill="url(#revenueGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        <div className={chartCard}>
          <p className={chartTitle}>Orders Overview</p>
          {revenueData.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-16">No orders yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Revenue" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={chartCard}>
          <p className={chartTitle}>Product Categories</p>
          {categoryData.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-16">No products yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      <div className={chartCard}>
        <p className={chartTitle}>Top Products by Price</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={topProducts}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Price" radius={[0, 6, 6, 0]}>
              {topProducts.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        </div>
        {allOrders.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left">
                <tr>
                  <th className="px-6 py-3 font-medium">User ID</th>
                  <th className="px-6 py-3 font-medium">Items</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {allOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4 font-mono text-xs truncate max-w-[180px] text-gray-600 dark:text-gray-400">
                      {order.userId}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{order.qty}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminStats;