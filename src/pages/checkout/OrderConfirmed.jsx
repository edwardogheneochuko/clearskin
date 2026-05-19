import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderConfirmed = ({ getValues }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
  >
    <div className="text-center max-w-md">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <CheckCircle size={80} className="text-green-500" />
      </motion.div>

      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-2">
        Thank you, <span className="font-medium">{getValues("firstName")}</span>!
      </p>
      <p className="text-gray-400 text-sm mb-8">
        A confirmation has been sent to{" "}
        <span className="text-gray-600">{getValues("email")}</span>
      </p>

      <div className="bg-white rounded-2xl border p-5 text-left mb-8 shadow-sm">
        <p className="text-sm font-medium mb-1">Shipping to</p>
        <p className="text-sm text-gray-500">
          {getValues("address")}, {getValues("city")}, {getValues("country")} {getValues("zip")}
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/"
          className="flex-1 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50 transition text-center"
        >
          Back to Home
        </Link>
        <Link
          to="/explore"
          className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition text-center"
        >
          Keep Shopping
        </Link>
      </div>
    </div>
  </motion.div>
);

export default OrderConfirmed;