import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag, MapPin, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import usePromoStore from "@/store/promoStore";

import ShippingStep   from "./steps/ShippingStep";
import PaymentStep    from "./steps/PaymentStep";
import ReviewStep     from "./steps/ReviewStep";
import OrderSummary   from "./OrderSummary";
import OrderConfirmed from "./OrderConfirmed";

const checkoutSchema = z.object({
  firstName:  z.string().min(2, "First name is required"),
  lastName:   z.string().min(2, "Last name is required"),
  email:      z.string().email("Enter a valid email"),
  phone:      z.string().min(8, "Enter a valid phone number"),
  address:    z.string().min(5, "Address is required"),
  city:       z.string().min(2, "City is required"),
  country:    z.string().min(2, "Country is required"),
  zip:        z.string().min(3, "ZIP code is required"),
  cardName:   z.string().min(2, "Name on card is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Enter a valid 16-digit card number"),
  expiry:     z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format: MM/YY"),
  cvv:        z.string().regex(/^\d{3,4}$/, "Enter a valid CVV"),
});

const STEPS = [
  { key: "shipping", label: "Shipping", icon: MapPin      },
  { key: "payment",  label: "Payment",  icon: CreditCard  },
  { key: "review",   label: "Review",   icon: ShoppingBag },
];

const shippingFields = ["firstName","lastName","email","phone","address","city","country","zip"];
const paymentFields  = ["cardName","cardNumber","expiry","cvv"];

const Checkout = () => {
  const [step, setStep]           = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [placing, setPlacing]     = useState(false);

  const user      = useAuthStore((s) => s.user);
  const userId    = user?.uid || "guest";
  const cartsMap  = useCartStore((s) => s.carts);
  const cart      = cartsMap[userId] || [];
  const clearCart = useCartStore((s) => s.clearCart);

  const { discount, applied, removeCode } = usePromoStore();

  const subtotal    = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping    = subtotal > 60 ? 0 : 5.99;
  const discountAmt = applied ? (subtotal * discount) / 100 : 0;
  const total       = subtotal + shipping - discountAmt;

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(checkoutSchema) });

  const handleNext = async () => {
    const fields = step === 0 ? shippingFields : paymentFields;
    const valid  = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onPlaceOrder = async () => {
    setPlacing(true);
    const loadingToast = toast.loading("Placing your order...");

    try {
      await new Promise((r) => setTimeout(r, 1500));
      clearCart(userId);
      removeCode();
      setConfirmed(true);
      toast.dismiss(loadingToast);
      toast.success("Order placed successfully 🎉");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  if (confirmed) return <OrderConfirmed getValues={getValues} />;

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
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <ShippingStep
                  register={register}
                  errors={errors}
                  onNext={handleNext}
                  userEmail={user?.email}
                />
              )}
              {step === 1 && (
                <PaymentStep
                  register={register}
                  errors={errors}
                  onNext={handleNext}
                  onBack={() => setStep(0)}
                />
              )}
              {step === 2 && (
                <ReviewStep
                  getValues={getValues}
                  cart={cart}
                  onBack={() => setStep(1)}
                  onPlace={handleSubmit(onPlaceOrder)}
                  placing={placing}
                />
              )}
            </AnimatePresence>
          </div>

          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            discountAmt={discountAmt}
            total={total}
            applied={applied}
          />
        </div>

      </div>
    </div>
  );
};

export default Checkout;