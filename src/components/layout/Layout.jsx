import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import content from "../../assets/data/content.json";

const Layout = () => {
  const { footer } = content;

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer footer={footer} />
    </>
  );
};

export default Layout;