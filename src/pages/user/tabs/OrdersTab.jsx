import { Link } from "react-router-dom";
import { ShoppingBag, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import useOrderStore from "@/store/orderStore";
import useAuthStore  from "@/store/authStore";

const StatusBadge = ({ status }) => {
  const styles = {
    confirmed: "bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400",
    shipped:   "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    delivered: "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status] || styles.confirmed}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(order.placedAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const placed   = new Date(order.placedAt);
  const delivery = new Date(placed);
  let added = 0;
  while (added < 5) {
    delivery.setDate(delivery.getDate() + 1);
    if (delivery.getDay() !== 0 && delivery.getDay() !== 6) added++;
  }
  const deliveryStr = delivery.toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3
                      bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono font-semibold text-gray-600 dark:text-gray-300">
            {order.id}
          </span>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            {date}
          </div>
          <span className="font-bold text-sm text-gray-900 dark:text-white">
            ${order.total.toFixed(2)}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition cursor-pointer"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 py-4 space-y-4">

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.image} loading="lazy" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1 text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Qty: {item.quantity} · ${item.price} each
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${(order.total - order.shipping).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Shipping</span>
              <span className={order.shipping === 0 ? "text-green-500" : ""}>
                {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800 pt-1.5">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <MapPin size={14} className="text-pink-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
                  Shipped to
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{order.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <Clock size={14} className="text-pink-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
                  Estimated delivery
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By {deliveryStr} (3–5 business days)
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

const OrdersTab = () => {
  const user   = useAuthStore((s) => s.user);
  const userId = user?.uid || "guest";
  const orders = useOrderStore((s) => s.getOrders(userId));

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Order History
        </h2>
        <div className="text-center py-12">
          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={22} className="text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            No orders yet
          </p>
          <Link
            to="/explore"
            className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-neutral-800 dark:hover:bg-gray-200 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Order History
        </h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;