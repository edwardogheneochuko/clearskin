import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const ReviewStep = ({ getValues, cart, onBack, onPlace, placing }) => (
  <motion.div
    key="review"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
      <ShoppingBag size={18} className="text-pink-400" /> Review Order
    </h2>

    <div className="rounded-xl border p-4 mb-4">
      <p className="text-xs font-medium text-gray-400 uppercase mb-2">Shipping to</p>
      <p className="text-sm font-medium">
        {getValues("firstName")} {getValues("lastName")}
      </p>
      <p className="text-sm text-gray-500">
        {getValues("address")}, {getValues("city")}, {getValues("country")} {getValues("zip")}
      </p>
      <p className="text-sm text-gray-500">{getValues("phone")}</p>
    </div>

    <div className="rounded-xl border p-4 mb-6">
      <p className="text-xs font-medium text-gray-400 uppercase mb-2">Payment</p>
      <p className="text-sm font-medium">{getValues("cardName")}</p>
      <p className="text-sm text-gray-500">
        •••• •••• •••• {getValues("cardNumber")?.slice(-4)}
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <img src={item.image} loading="lazy" className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
          </div>
          <p className="text-sm font-semibold shrink-0">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>

    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="flex-1 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
      >
        Back
      </button>
      <button
        onClick={onPlace}
        disabled={placing}
        className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer disabled:opacity-60"
      >
        {placing ? "Placing order..." : "Place Order"}
      </button>
    </div>
  </motion.div>
);

export default ReviewStep;