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
  const { hero, essentials, products, under25Products, features, blogs, footer } = content;

  return (
    <div className="px-3 sm:px-5 md:px-5 overflow-x-hidden">

      <section id="collection" className="w-full">
        <HeroSection hero={hero} />
        <EssentialsSection essentials={essentials} />
      </section>

      <section id="shop" className="w-full mt-8 sm:mt-10">
        <ProductSection title="Our Bestsellers" products={products} />
        <ProductSection title="Under $25" products={under25Products} />
      </section>

      <div className="w-full mt-8 sm:mt-10">
        <PromoSection />
      </div>

      <section className="w-full mt-8 sm:mt-10">
        <FeaturesSection features={features} />
      </section>

      <section id="offer" className="w-full mt-8 sm:mt-10">
        <OfferSection />
      </section>

      <section id="blog" className="w-full mt-8 sm:mt-10">
        <BlogSection blogs={blogs} />
      </section>

      <div className="w-full mt-10 sm:mt-12">
        <Footer footer={footer} />
      </div>

    </div>
  );
};

export default Home;