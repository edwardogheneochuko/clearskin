import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../src/App.css";

import useThemeStore from "./store/themeStore";
import PageTransition from "./components/layout/PageTransition";
import GlobalParticles from "./components/ui/GlobalParticles";

const Layout = lazy(() => import("./components/layout/Layout"));
const Home = lazy(() => import("./components/Home"));
const Explore = lazy(() => import("./pages/shop/Explore"));
const BlogDetails = lazy(() => import("./components/blog/BlogDetails"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRoute = lazy(() => import("./components/auth/AdminRoute"));
const UserProfile = lazy(() => import("./pages/user/UserProfile"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const Favorite = lazy(() => import("./pages/shop/Favorite"));
const ProductDetails = lazy(() => import("./pages/shop/ProductDetails"));
const Cart = lazy(() => import("./pages/shop/Cart"));
const NotFound = lazy(() => import("./components/layout/NotFound"));
const Funds = lazy(() => import("./pages/shop/Funds"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center dark:bg-black">
    <div className="w-8 h-8 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  const initTheme = useThemeStore((s) => s.initTheme);

  useEffect(initTheme, [initTheme]);

  return (
    <Suspense fallback={<PageLoader />}>
      {/* 🌸 GLOBAL BACKGROUND EFFECT (dark mode only) */}
      <GlobalParticles />

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

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PageTransition>
              <ForgotPassword />
            </PageTransition>
          }
        />

        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />

      </Routes>
    </Suspense>
  );
}