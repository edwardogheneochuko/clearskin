import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { auth, googleProvider } from "@/utils/firebase";
import useAuthStore from "@/store/authStore";
import { isAdmin } from "@/utils/adminConfig";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const urlImage =
    "https://res.cloudinary.com/direjlzc6/image/upload/v1779797933/mqp3kbhsgaceledvltrs.jpg";

  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  });

  const saveUserToStore = (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });
    }
  };

  const onSubmit = async (data) => {
    setError("");

    try {
      let credential;

      if (isSignup) {
        credential = await createUserWithEmailAndPassword(
          auth,
          data.email.trim(),
          data.password
        );
        toast.success("Account created successfully 🎉");
      } else {
        credential = await signInWithEmailAndPassword(
          auth,
          data.email.trim(),
          data.password
        );
        toast.success("Login successful");
      }

      saveUserToStore(credential.user);

      const destination = isAdmin(credential.user.email)
        ? "/admin"
        : "/profile";

      navigate(destination);
    } catch (err) {
      setError(err.message);
      toast.error("Authentication failed");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful");

      saveUserToStore(credential.user);
      navigate("/profile");
    } catch (err) {
      toast.error("Google authentication failed");
    }
  };

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    reset();
    setError("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <img
        src={urlImage}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80" />

      {/* LOGIN CARD */}
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
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              {isSignup
                ? "Sign up to get started"
                : "Login to continue your journey"}
            </p>
          </div>

          <X
            onClick={() => navigate("/")}
            className="text-gray-300 hover:text-pink-400 cursor-pointer"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="
              w-full p-3 rounded-xl
              bg-white/10 text-white
              placeholder-gray-300
              outline-none focus:ring-2 focus:ring-pink-400
            "
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="
              w-full p-3 rounded-xl
              bg-white/10 text-white
              placeholder-gray-300
              outline-none focus:ring-2 focus:ring-pink-400
            "
          />
          {errors.password && (
            <p className="text-red-400 text-xs">{errors.password.message}</p>
          )}

          {!isSignup && (
            <p
              onClick={() => navigate("/forgot-password")}
              className="text-right text-sm text-pink-300 cursor-pointer"
            >
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full py-3 rounded-xl
              bg-pink-500 hover:bg-pink-600
              text-white font-medium
              transition
            "
          >
            {isSubmitting
              ? "Processing..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleAuth}
          className="
            w-full mt-4 py-3 rounded-xl
            flex items-center justify-center gap-2
            bg-white/10 hover:bg-white/20
            text-white border border-white/20
          "
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* SWITCH */}
        <p className="text-center text-sm mt-6 text-gray-300">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span
            onClick={handleToggleMode}
            className="text-pink-400 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm text-center mt-3">
            {error}
          </p>
        )}
      </motion.section>
    </div>
  );
};

export default Login;