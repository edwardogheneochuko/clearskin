import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import content from "../../assets/data/content.json";

const Layout = () => {
  const footer = content?.footer;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer footer={footer} />
    </div>
  );
};

export default Layout;