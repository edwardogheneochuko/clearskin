import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, ShoppingBag, MapPin, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName:  z.string().min(2, "Last name is required"),
  email:     z.string().email("Enter a valid email"),
  phone:     z.string().min(8, "Enter a valid phone number"),
  address:   z.string().min(5, "Address is required"),
  city:      z.string().min(2, "City is required"),
  country:   z.string().min(2, "Country is required"),
  zip:       z.string().min(3, "ZIP code is required"),
  cardName:  z.string().min(2, "Name on card is required"),
  cardNumber:z.string().regex(/^\d{16}$/, "Enter a valid 16-digit card number"),
  expiry:    z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format: MM/YY"),
  cvv:       z.string().regex(/^\d{3,4}$/, "Enter a valid CVV"),
});

const STEPS = [
  { key: "shipping", label: "Shipping",  icon: MapPin      },
  { key: "payment",  label: "Payment",   icon: CreditCard  },
  { key: "review",   label: "Review",    icon: ShoppingBag },
];

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Input = ({ error, ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 transition
      ${error ? "focus:ring-red-400" : "focus:ring-pink-400"}`}
  />
);

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [placing, setPlacing] = useState(false);

  const user = useAuthStore((s) => s.user);
  const userId = user?.uid || "guest";
  const cartsMap = useCartStore((s) => s.carts);
  const cart = cartsMap[userId] || [];
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal > 60 ? 0 : 5.99;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkoutSchema) });

  const shippingFields = ["firstName","lastName","email","phone","address","city","country","zip"];
  const paymentFields  = ["cardName","cardNumber","expiry","cvv"];

  const handleNext = async () => {
    const fields = step === 0 ? shippingFields : paymentFields;
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onPlaceOrder = async () => {
    setPlacing(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));
    clearCart(userId);
    setConfirmed(true);
    setPlacing(false);
    toast.success("Order placed successfully! 🎉");
  };

  // ── Order confirmed screen ──────────────────────────────────────────
  if (confirmed) {
    return (
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
            A confirmation will be sent to{" "}
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
  }

  // ── Empty cart guard ────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <ShoppingBag size={48} className="text-gray-300" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link
          to="/explore"
          className="px-6 py-3 rounded-xl bg-black text-white text-sm hover:bg-neutral-800 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10 mt-20">
      <div className="max-w-5xl mx-auto">

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
                ${i === step ? "bg-black text-white" : i < step ? "bg-green-100 text-green-600" : "bg-white border text-gray-400"}`}
              >
                <s.icon size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={16} className="text-gray-300" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">

          {/* ── Form ─────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <AnimatePresence mode="wait">

              {/* Step 0 — Shipping */}
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-pink-400" /> Shipping Details
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" error={errors.firstName?.message}>
                      <Input {...register("firstName")} placeholder="John" error={errors.firstName} />
                    </Field>
                    <Field label="Last Name" error={errors.lastName?.message}>
                      <Input {...register("lastName")} placeholder="Doe" error={errors.lastName} />
                    </Field>
                  </div>

                  <Field label="Email" error={errors.email?.message}>
                    <Input {...register("email")} type="email" placeholder="john@email.com" error={errors.email} defaultValue={user?.email} />
                  </Field>

                  <Field label="Phone" error={errors.phone?.message}>
                    <Input {...register("phone")} placeholder="+1 234 567 8900" error={errors.phone} />
                  </Field>

                  <Field label="Address" error={errors.address?.message}>
                    <Input {...register("address")} placeholder="123 Main Street" error={errors.address} />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" error={errors.city?.message}>
                      <Input {...register("city")} placeholder="New York" error={errors.city} />
                    </Field>
                    <Field label="ZIP Code" error={errors.zip?.message}>
                      <Input {...register("zip")} placeholder="10001" error={errors.zip} />
                    </Field>
                  </div>

                  <Field label="Country" error={errors.country?.message}>
                    <Input {...register("country")} placeholder="United States" error={errors.country} />
                  </Field>

                  <button
                    onClick={handleNext}
                    className="w-full mt-2 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* Step 1 — Payment */}
              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CreditCard size={18} className="text-pink-400" /> Payment Details
                  </h2>

                  <Field label="Name on Card" error={errors.cardName?.message}>
                    <Input {...register("cardName")} placeholder="John Doe" error={errors.cardName} />
                  </Field>

                  <Field label="Card Number" error={errors.cardNumber?.message}>
                    <Input
                      {...register("cardNumber")}
                      placeholder="1234567812345678"
                      maxLength={16}
                      error={errors.cardNumber}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry (MM/YY)" error={errors.expiry?.message}>
                      <Input {...register("expiry")} placeholder="08/27" error={errors.expiry} />
                    </Field>
                    <Field label="CVV" error={errors.cvv?.message}>
                      <Input {...register("cvv")} placeholder="123" maxLength={4} error={errors.cvv} />
                    </Field>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    🔒 Your payment info is encrypted and secure
                  </p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep(0)}
                      className="flex-1 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Review */}
              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <ShoppingBag size={18} className="text-pink-400" /> Review Order
                  </h2>

                  {/* Shipping summary */}
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

                  {/* Payment summary */}
                  <div className="rounded-xl border p-4 mb-6">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-2">Payment</p>
                    <p className="text-sm font-medium">{getValues("cardName")}</p>
                    <p className="text-sm text-gray-500">
                      •••• •••• •••• {getValues("cardNumber")?.slice(-4)}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
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
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit(onPlaceOrder)}
                      disabled={placing}
                      className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer disabled:opacity-60"
                    >
                      {placing ? "Placing order..." : "Place Order"}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Order summary sidebar ─────────────────────────────────── */}
          <div className="h-fit sticky top-28 bg-white rounded-2xl border shadow-sm p-6">
            <h2 className="font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
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
                <p className="text-xs text-gray-400">
                  Free shipping on orders over $60
                </p>
              )}
              <div className="flex justify-between font-bold text-base border-t pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;