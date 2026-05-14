import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "../src/App.css";

import Layout from "./components/layout/Layout";

import Home from "./components/Home";
import Explore from "./pages/Explore";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import BlogDetails from "./components/blog/BlogDetails";
import Favorite from "./pages/Favorite";

import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorite />
            </ProtectedRoute> } />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute> }/>
      <Route path="/cart/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute> }/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}