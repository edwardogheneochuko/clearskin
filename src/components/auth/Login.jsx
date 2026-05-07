"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((res) => setTimeout(res, 1000));
    alert("Login successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <section className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <button onClick={() => navigate("/")}
          className="text-gray-400 hover:text-black transition text-lg cursor-pointer">
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Welcome back. Please enter your details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email address"
              className="w-full rounded-lg px-4 py-3 bg-gray-100 focus:bg-white
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-lg px-4 py-3 bg-gray-100 focus:bg-white
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-pink-400" />
              Remember me
            </label>
            <a href="#" className="text-pink-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-400 text-white py-3 rounded-lg cursor-pointer
            hover:bg-pink-500 transition font-medium"
          >
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-pink-400 hover:underline">
            Sign up
          </a>
        </p>

      </section>
    </div>
  );
};

export default Login;