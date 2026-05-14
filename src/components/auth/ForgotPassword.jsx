import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { auth } from "../../utils/firebase";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      toast.success("Password reset email sent");

      setEmail("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100"
      >

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-3xl font-bold text-black">
              Forgot Password
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Enter your email to reset your password.
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-black transition text-lg cursor-pointer"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4"
        >

          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-gray-100
              focus:bg-white focus:outline-none
              focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={loading}
            className="w-full bg-pink-400 text-white py-3 rounded-xl
            hover:bg-pink-500 transition font-medium shadow-md cursor-pointer"
          >
            {loading
              ? "Sending reset link..."
              : "Send Reset Link"}
          </motion.button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">

          Remember your password?{" "}

          <button
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:underline
            cursor-pointer font-medium"
          >
            Sign In
          </button>

        </p>

      </motion.section>

    </div>
  );
};

export default ForgotPassword;