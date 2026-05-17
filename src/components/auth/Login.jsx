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
import { isAdmin } from "@/utils/adminConfig"; // ✅

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

      // ✅ Redirect admin to /admin, everyone else to /
      const destination = isAdmin(credential.user.email) ? "/admin" : "/";
      navigate(destination);
    } catch (err) {
      const msg = err.message;
      setError(msg);

      toast.error(
        msg.includes("invalid-credential")
          ? "Invalid email or password"
          : msg.includes("user-not-found")
          ? "User not found"
          : msg.includes("email-already-in-use")
          ? "Email already exists"
          : "Something went wrong"
      );
    }
  };

  const handleGoogleAuth = async () => {
    setError("");

    try {
      const credential = await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful");
      saveUserToStore(credential.user);

      // ✅ Redirect admin to /admin, everyone else to /
      const destination = isAdmin(credential.user.email) ? "/admin" : "/";
      navigate(destination);
    } catch (err) {
      setError(err.message);
      toast.error("Google authentication failed");
    }
  };

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    reset();
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {isSignup ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isSignup
                ? "Create your account"
                : "Welcome back, login to continue"}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-black transition cursor-pointer mt-1"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {!isSignup && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-pink-400 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-400 text-white py-3 rounded-xl hover:bg-pink-500 transition disabled:opacity-60"
          >
            {isSubmitting ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleAuth}
          className="w-full mt-4 border py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button
            onClick={handleToggleMode}
            className="text-pink-400 font-medium cursor-pointer"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}
      </motion.section>
    </div>
  );
};

export default Login;