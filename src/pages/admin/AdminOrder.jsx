import useCartStore from "@/store/cartStore";

const AdminOrders = () => {
  const carts = useCartStore((s) => s.carts);

  const orders = Object.entries(carts)
    .filter(([, items]) => items.length > 0)
    .map(([userId, items]) => ({
      userId,
      items,
      total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      qty: items.reduce((acc, i) => acc + i.quantity, 0),
    }));

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {orders.length === 0 ? (
        <p className="text-center text-gray-400 py-16 text-sm">No orders yet</p>
      ) : (
        <div className="divide-y">
          {orders.map((order, i) => (
            <div key={i} className="p-5">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="text-xs font-mono text-gray-400 truncate max-w-[260px]">
                  User: {order.userId}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                    {order.qty} items
                  </span>
                  <span className="font-bold text-sm">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                    <img src={item.image} loading="lazy"
                    className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-400">x{item.quantity} · ${item.price}</p>
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