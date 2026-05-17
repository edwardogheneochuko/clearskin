import { Routes, Route } from "react-router-dom";
import "../src/App.css";

// pages
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Explore from "./pages/Explore";
import BlogDetails from "./components/blog/BlogDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/auth/AdminRoute";
import UserProfile from "./pages/user/UserProfile";

// auth
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ForgotPassword from "./components/auth/ForgotPassword";

import Favorite from "./pages/Favorite";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./components/layout/NotFound";
import Funds from "./pages/Funds";

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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/funds" element={<Funds />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}