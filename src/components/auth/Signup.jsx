"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    await new Promise((res) => setTimeout(res, 1000));

    alert("Account created successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Sign Up</h1>

          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-black transition text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Create your account to get started.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Full name"
              className="w-full rounded-lg px-4 py-3 bg-gray-100 focus:bg-white
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
              className="w-full rounded-lg px-4 py-3 bg-gray-100 focus:bg-white
              focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-400 text-white py-3 rounded-lg
            hover:bg-pink-500 transition font-medium"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-pink-400 hover:underline">
            Sign in
          </a>
        </p>

      </section>
    </div>
  );
};

export default Signup;