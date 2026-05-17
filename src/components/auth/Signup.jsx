import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import { auth, googleProvider } from "../../utils/firebase";
import useAuthStore from "../../store/authStore";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: data.name,
      });

      toast.success("Account created successfully 🎉");
      navigate("/");
    } catch (err) {
      const msg = err.message;
      setError(msg);

      toast.error(
        msg.includes("email-already-in-use")
          ? "Email already exists"
          : "Something went wrong"
      );
    }
  };

  const handleGoogleSignup = async () => {
    setError("");

    try {
      const credential = await signInWithPopup(auth, googleProvider);

      setUser({
        uid: credential.user.uid,
        email: credential.user.email,
        name: credential.user.displayName,
      });

      toast.success("Google signup successful 🚀");
      navigate("/"); 
    } catch (err) {
      setError(err.message);
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create your account to get started.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-black transition text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Full name"
              className="w-full rounded-xl px-4 py-3 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email address"
              className="w-full rounded-xl px-4 py-3 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-xl px-4 py-3 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
              className="w-full rounded-xl px-4 py-3 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-400 text-white py-3 rounded-xl hover:bg-pink-500 transition font-medium shadow-md cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <div className="relative my-6">
          <div className="border-t border-gray-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm text-gray-400">
            OR
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={handleGoogleSignup}
          className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition cursor-pointer font-medium"
        >
          <FcGoogle className="text-2xl" />
          Sign up with Google
        </motion.button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:underline cursor-pointer font-medium"
          >
            Sign In
          </button>
        </p>
      </motion.section>
    </div>
  );
};

export default Signup;