import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { X, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import { auth, googleProvider } from "@/utils/firebase";
import { createOrUpdateUser } from "@/utils/firebaseUser";
import useAuthStore from "@/store/authStore";
import { isAdmin } from "@/utils/adminConfig";

const loginSchema = z.object({
  email:    z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const urlImage = "https://res.cloudinary.com/direjlzc6/image/upload/v1779797933/mqp3kbhsgaceledvltrs.jpg";

const Login = () => {
  const navigate = useNavigate();
  const setUser  = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const saveUserToStore = (user) => {
    if (user) {
      setUser({
        uid:      user.uid,
        email:    user.email,
        name:     user.displayName,
        photoURL: user.photoURL,
      });
    }
  };

  const redirectAfterAuth = (email) => {
    if (isAdmin(email)) {
      navigate("/admin");
    } else {
      navigate("/explore");
    }
  };

  const onSubmit = async (data) => {
    setError("");
    try {
      const credential = await signInWithEmailAndPassword(
        auth, data.email.trim(), data.password
      );
      toast.success("Welcome back! ");
      saveUserToStore(credential.user);
      redirectAfterAuth(credential.user.email);
      createOrUpdateUser(credential.user).catch((error) => {
        console.error("Failed to create/update Firestore user after login:", error);
      });
    } catch (err) {
      const msg = err.message;
      setError(msg);
      toast.error(
        msg.includes("invalid-credential") || msg.includes("wrong-password")
          ? "Invalid email or password"
          : msg.includes("user-not-found")
          ? "No account found with this email"
          : "Something went wrong"
      );
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful ");
      saveUserToStore(credential.user);
      redirectAfterAuth(credential.user.email);
      createOrUpdateUser(credential.user).catch((error) => {
        console.error("Failed to create/update Firestore user after Google login:", error);
      });
    } catch {
      toast.error("Google authentication failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">

      <img
        src={urlImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55 dark:bg-black/75" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles size={16} className="text-pink-400" />
          <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
            ClearSkin
          </span>
          <Sparkles size={16} className="text-pink-400" />
        </div>

        <div className="backdrop-blur-2xl bg-white/10 dark:bg-black/40
                        border border-white/20 dark:border-white/10
                        rounded-3xl p-8 shadow-2xl">

          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-2xl font-bold text-white">Sign In</h1>
              <p className="text-sm text-white/60 mt-1">
                Good to see you again ✨
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email")}
                className="w-full px-4 py-3 rounded-xl
                           bg-white/10 dark:bg-white/5
                           border border-white/20 dark:border-white/10
                           text-white placeholder-white/40
                           text-sm outline-none
                           focus:ring-2 focus:ring-pink-400
                           transition"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-xl
                           bg-white/10 dark:bg-white/5
                           border border-white/20 dark:border-white/10
                           text-white placeholder-white/40
                           text-sm outline-none
                           focus:ring-2 focus:ring-pink-400
                           transition"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-pink-300 hover:text-pink-400 cursor-pointer transition"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl
                         bg-pink-500 hover:bg-pink-600
                         active:scale-95
                         text-white text-sm font-semibold
                         transition-all duration-200
                         disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-xs text-white/40">or</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          <button
            onClick={handleGoogleAuth}
            className="w-full py-3 rounded-xl
                       flex items-center justify-center gap-2.5
                       bg-white/10 hover:bg-white/20
                       dark:bg-white/5 dark:hover:bg-white/10
                       border border-white/20 dark:border-white/10
                       text-white text-sm font-medium
                       transition cursor-pointer active:scale-95"
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <p className="text-center text-xs text-white/50 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-pink-400 hover:text-pink-300 font-medium cursor-pointer transition"
            >
              Create one
            </button>
          </p>

          {error && (
            <p className="text-red-400 text-xs text-center mt-3">{error}</p>
          )}
        </div>

        <p className="text-center text-white/30 text-xs mt-5">
          By signing in you agree to our Terms & Privacy Policy
        </p>
      </motion.section>
    </div>
  );
};

export default Login;