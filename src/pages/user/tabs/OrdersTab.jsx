import { Link } from "react-router-dom";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const OrdersTab = () => {
  const user = useAuthStore((s) => s.user);
  const cartsMap = useCartStore((s) => s.carts);
  const cart = cartsMap[user?.uid || "guest"] || [];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Order History</h2>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-sm mb-4">No items in cart yet</p>
          <Link
            to="/explore"
            className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border">
              <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span>${cart.reduce((a, i) => a + i.price * i.quantity, 0).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;