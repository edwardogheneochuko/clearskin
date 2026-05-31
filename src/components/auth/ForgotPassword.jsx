import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { auth } from "../../utils/firebase";

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const getFriendlyError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    default:
      return "Something went wrong. Please try again";
  }
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const bgImage =
    "https://res.cloudinary.com/direjlzc6/image/upload/v1779797933/mqp3kbhsgaceledvltrs.jpg";

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("Please enter your email");
    if (!isValidEmail(email)) return toast.error("Invalid email format");

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email.trim());

      toast.success("Reset link sent — check your email");
      setEmail("");
    } catch (err) {
      toast.error(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <img
        src={bgImage}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80" />

      {/* CARD */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          relative z-10
          w-full max-w-md
          backdrop-blur-xl
          bg-white/10 dark:bg-black/40
          border border-white/20 dark:border-white/10
          rounded-3xl p-8
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              Enter your email to reset your password
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-pink-400 text-lg"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleResetPassword} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full p-3 rounded-xl
              bg-white/10 text-white
              placeholder-gray-300
              outline-none focus:ring-2 focus:ring-pink-400
            "
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-pink-500 hover:bg-pink-600
              text-white font-medium
              transition
            "
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-400 cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </motion.section>
    </div>
  );
};

export default ForgotPassword;