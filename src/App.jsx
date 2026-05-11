import React from "react";
import { Routes, Route } from "react-router-dom";
import "../src/App.css"

import Layout from "./components/layout/Layout";

import Home from "./components/Home";
import Explore from "./pages/Explore";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}