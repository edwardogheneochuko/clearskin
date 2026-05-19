import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "../src/App.css";

import PageTransition from "./components/layout/PageTransition";

const Layout         = lazy(() => import("./components/layout/Layout"));
const Home           = lazy(() => import("./components/Home"));
const Explore        = lazy(() => import("./pages/Explore"));
const BlogDetails    = lazy(() => import("./components/blog/BlogDetails"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRoute     = lazy(() => import("./components/auth/AdminRoute"));
const UserProfile    = lazy(() => import("./pages/user/UserProfile"));
const Login          = lazy(() => import("./components/auth/Login"));
const Signup         = lazy(() => import("./components/auth/Signup"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const Favorite       = lazy(() => import("./pages/Favorite"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart           = lazy(() => import("./pages/Cart"));
const NotFound       = lazy(() => import("./components/layout/NotFound"));
const Funds          = lazy(() => import("./pages/Funds"));
const Checkout       = lazy(() => import("./pages/checkout/Checkout"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route element={<Layout />}>
            <Route path="/"              element={<Home />}           />
            <Route path="/explore"       element={<Explore />}        />
            <Route path="/blog/:slug"    element={<BlogDetails />}    />
            <Route path="/product/:slug" element={<ProductDetails />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/favorites"     element={<Favorite />}     />
              <Route path="/cart"          element={<Cart />}         />
              <Route path="/cart/checkout" element={<Checkout />}     />
              <Route path="/profile"       element={<UserProfile />}  />
              <Route path="/funds"         element={<Funds />}        />
            </Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="/login"           element={<PageTransition><Login /></PageTransition>}          />
          <Route path="/signup"          element={<PageTransition><Signup /></PageTransition>}         />
          <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
          <Route path="*"                element={<PageTransition><NotFound /></PageTransition>}       />

        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}