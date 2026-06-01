import useCartStore from "@/store/cartStore";

const AdminOrders = () => {
  const carts = useCartStore((s) => s.carts);

  const orders = Object.entries(carts)
    .filter(([, items]) => items.length > 0)
    .map(([userId, items]) => ({
      userId,
      items,
      total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      qty:   items.reduce((acc, i) => acc + i.quantity, 0),
    }));

  return (
    <div className="bg-white dark:bg-gray-900
                    rounded-2xl border border-gray-200 dark:border-gray-800
                    shadow-sm overflow-hidden">
      {orders.length === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-500 py-16 text-sm">
          No orders yet
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {orders.map((order, i) => (
            <div key={i} className="p-5">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="text-xs font-mono text-gray-400 dark:text-gray-500 truncate max-w-[260px]">
                  User: {order.userId}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                    {order.qty} items
                  </span>
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2
                               bg-gray-50 dark:bg-gray-800
                               rounded-xl px-3 py-2"
                  >
                    <img src={item.image} loading="lazy" className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-medium line-clamp-1 text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        x{item.quantity} · ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;