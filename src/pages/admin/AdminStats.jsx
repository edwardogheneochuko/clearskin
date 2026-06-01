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
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color:
        "bg-green-50 text-green-500 dark:bg-green-500/10 dark:text-green-400",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color:
        "bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color:
        "bg-pink-50 text-pink-500 dark:bg-pink-500/10 dark:text-pink-400",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color:
        "bg-purple-50 text-purple-500 dark:bg-purple-500/10 dark:text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-zinc-800"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}
            >
              <stat.icon size={20} />
            </div>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h3>
        </div>

        {allOrders.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-10 text-sm">
            No orders yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 text-left">
                <tr>
                  <th className="px-6 py-3 font-medium">User ID</th>
                  <th className="px-6 py-3 font-medium">Items</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {allOrders.map((order, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition"
                  >
                    <td className="px-6 py-4 font-mono text-xs truncate max-w-[180px] text-gray-700 dark:text-gray-300">
                      {order.userId}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {order.items.reduce((a, i) => a + i.quantity, 0)}
                    </td>

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