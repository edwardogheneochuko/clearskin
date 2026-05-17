import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";
import useAdminStore from "@/store/adminStore";
import useCartStore from "@/store/cartStore";

const AdminStats = () => {
  const products = useAdminStore((s) => s.products);
  const carts = useCartStore((s) => s.carts);

  const allOrders = Object.entries(carts).map(([userId, items]) => ({
    userId,
    items,
    total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
  }));

  const totalRevenue = allOrders.reduce((acc, o) => acc + o.total, 0);
  const totalUsers = Object.keys(carts).length;
  const totalOrders = allOrders.length;

  const stats = [
    { label: "Total Revenue",  value: `$${totalRevenue.toFixed(2)}`, icon: TrendingUp, color: "bg-green-50 text-green-500"  },
    { label: "Total Orders",   value: totalOrders,                   icon: ShoppingBag, color: "bg-blue-50 text-blue-500"   },
    { label: "Total Products", value: products.length,               icon: Package,     color: "bg-pink-50 text-pink-500"   },
    { label: "Total Users",    value: totalUsers,                    icon: Users,       color: "bg-purple-50 text-purple-500"},
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold">Recent Orders</h3>
        </div>
        {allOrders.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-6 py-3 font-medium">User ID</th>
                  <th className="px-6 py-3 font-medium">Items</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {allOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs truncate max-w-[180px]">{order.userId}</td>
                    <td className="px-6 py-4">{order.items.reduce((a, i) => a + i.quantity, 0)}</td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
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