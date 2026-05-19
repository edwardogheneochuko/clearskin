import { Tag, X } from "lucide-react";
import usePromoStore from "@/store/promoStore";

const OrderSummary = ({ cart, subtotal, shipping, discountAmt, total, applied }) => {
  const {
    code, setCode,
    discount, error: promoError,
    applyCode, removeCode,
  } = usePromoStore();

  return (
    <div className="h-fit sticky top-28 bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.image} loading="lazy" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium line-clamp-1">{item.title}</p>
              <p className="text-xs text-gray-400">x{item.quantity}</p>
            </div>
            <p className="text-xs font-semibold shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-4">
        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
          <Tag size={12} /> Promo Code
        </p>

        {applied ? (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-green-50 border border-green-200">
            <div>
              <p className="text-xs font-semibold text-green-600">{code}</p>
              <p className="text-xs text-green-500">{discount}% off applied</p>
            </div>
            <button
              onClick={removeCode}
              className="text-green-400 hover:text-red-400 transition cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && applyCode()}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400 uppercase tracking-wider"
            />
            <button
              onClick={applyCode}
              className="px-3 py-2 rounded-xl bg-black text-white text-xs font-medium hover:bg-neutral-800 transition cursor-pointer"
            >
              Apply
            </button>
          </div>
        )}

        {promoError && (
          <p className="text-red-400 text-xs mt-1">{promoError}</p>
        )}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-500" : ""}>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-400">Free shipping on orders over $60</p>
        )}
        {applied && (
          <div className="flex justify-between text-green-500 font-medium">
            <span>Discount ({discount}%)</span>
            <span>-${discountAmt.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-base border-t pt-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;