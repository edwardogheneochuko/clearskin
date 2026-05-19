import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Field, Input } from "../CheckoutComponents";

const PaymentStep = ({ register, errors, onNext, onBack }) => (
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
      <Input {...register("cardNumber")} placeholder="1234567812345678" maxLength={16} error={errors.cardNumber} />
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
        onClick={onBack}
        className="flex-1 py-3 rounded-xl border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
      >
        Review Order
      </button>
    </div>
  </motion.div>
);

export default PaymentStep;