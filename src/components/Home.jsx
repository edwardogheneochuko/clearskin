import content from "../assets/data/content.json";
import HeroSection from "./home/HeroSection";
import EssentialsSection from "./home/EssentialsSection";
import ProductSection from "./home/ProductSection";
import PromoSection from "./home/PromoSection";
import FeaturesSection from "./home/FeaturesSection";
import OfferSection from "./home/OfferSection";
import BlogSection from "./home/BlogSection";
import Footer from "./layout/Footer";

const Home = () => {
  const { essentials, products, under25Products, features, blogs, footer } = content;

  return (
    <div className="mx-5">
      {/* SECTION 1 */}
      <HeroSection />

      {/* SECTION 2 */}
      <EssentialsSection essentials={essentials} />

      {/* SECTION 3 */}
      <ProductSection title="Our Bestsellers" products={products} />

      {/* SECTION 4 */}
      <ProductSection title="Under $25" products={under25Products} />

      {/* SECTION 5 */}
      <PromoSection />

      {/* SECTION 6 */}
      <FeaturesSection features={features} />

      {/* SECTION 7 */}
      <OfferSection />

      {/* SECTION 8 */}
      <BlogSection blogs={blogs} />

      {/* FOOTER */}
      <Footer  footer={footer}/>
    </div>
  );
};

export default Home;