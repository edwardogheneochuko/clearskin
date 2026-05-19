import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Field, Input } from "../CheckoutComponents";

const ShippingStep = ({ register, errors, onNext, userEmail }) => (
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
      <Input {...register("email")} type="email" placeholder="john@email.com" defaultValue={userEmail} error={errors.email} />
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
      onClick={onNext}
      className="w-full mt-2 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
    >
      Continue to Payment
    </button>
  </motion.div>
);

export default ShippingStep;