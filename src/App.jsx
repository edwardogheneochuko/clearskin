// App.jsx
import { Routes, Route } from "react-router-dom";
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
import ForgotPassword from "./components/auth/ForgotPassword";
import NotFound from "./components/layout/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
        </Route>

      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}