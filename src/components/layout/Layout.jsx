import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import CompareDrawer from "@/components/ui/CompareDrawer"
import InstallPrompt from "../ui/InstallPrompt";
import ErrorBoundary from "./ErrorBoundary";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen skin-page transition-colors duration-300">
      <Navbar />
      <InstallPrompt />
      <main className="flex-1">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
        </ErrorBoundary>
      </main>
      <Footer />
      <CompareDrawer />
    </div>
  );
};

export default Layout;