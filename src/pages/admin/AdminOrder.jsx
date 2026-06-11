import { useState, useMemo } from "react";
import { Download, Search, X } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { exportToCSV } from "@/utils/exportCsv";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const carts = useCartStore((s) => s.carts);
  const [search, setSearch] = useState("");

  const orders = useMemo(() =>
    Object.entries(carts)
      .filter(([, items]) => items.length > 0)
      .map(([userId, items]) => ({
        userId,
        items,
        total: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
        qty:   items.reduce((acc, i) => acc + i.quantity, 0),
      })),
    [carts]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return orders;
    return orders.filter((o) =>
      o.userId.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const handleExport = () => {
    if (orders.length === 0) {
      toast("No orders to export");
      return;
    }

    // ✅ Flatten orders — one row per item
    const rows = orders.flatMap((order) =>
      order.items.map((item) => ({
        "Order User ID": order.userId,
        "Product ID":    item.id,
        "Product Title": item.title,
        "Unit Price":    `$${item.price.toFixed(2)}`,
        "Quantity":      item.quantity,
        "Line Total":    `$${(item.price * item.quantity).toFixed(2)}`,
        "Order Total":   `$${order.total.toFixed(2)}`,
        "Total Items":   order.qty,
      }))
    );

    const date = new Date().toISOString().split("T")[0];
    exportToCSV(rows, `clearskin-orders-${date}.csv`);
    toast.success("Orders exported to CSV");
  };

  return (
    <div className="space-y-5">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user ID..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-sm outline-none
                       focus:ring-2 focus:ring-pink-400
                       bg-white dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={handleExport}
          disabled={orders.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition shrink-0
                     bg-black dark:bg-white text-white dark:text-black
                     hover:bg-neutral-800 dark:hover:bg-gray-200
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Orders list */}
      <div className="bg-white dark:bg-gray-900
                      rounded-2xl border border-gray-200 dark:border-gray-800
                      shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-16 text-sm">
            {orders.length === 0 ? "No orders yet" : "No orders match your search"}
          </p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((order, i) => (
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

    </div>
  );
};

export default AdminOrders;