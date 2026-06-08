import { Helmet } from "react-helmet-async";
import content from "@/assets/data/content.json";
import HeroSection from "./home/HeroSection";
import EssentialsSection from "./home/EssentialsSection";
import ProductSection from "./home/ProductSection";
import PromoSection from "./home/PromoSection";
import FeaturesSection from "./home/FeaturesSection";
import OfferSection from "./home/OfferSection";
import BlogSection from "./home/BlogSection";
import RecentlyViewed from "@/components/ui/RecentlyViewed";
import WebsiteJsonLd from "@/components/seo/WebsiteJsonLd";

const Home = () => {
  const { hero, essentials, products, under25Products, features, blogs } = content;

  return (
    <>
      <Helmet>
        <title>ClearSkin — Clean Skincare for Healthy Everyday Skin</title>
        <meta name="description"        content="Thoughtfully formulated skincare made with clean ingredients for real, everyday results." />
        <meta property="og:title"       content="ClearSkin — Clean Skincare" />
        <meta property="og:description" content="Thoughtfully formulated skincare made with clean ingredients." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://clearskin.com" />
      </Helmet>

      <WebsiteJsonLd />

      <div className="min-h-screen bg-white dark:bg-linear-to-b
                      dark:from-black dark:via-gray-950 dark:to-gray-900
                      transition-all duration-300">
        <section id="collection" className="w-full space-y-12 md:space-y-16">
          <HeroSection hero={hero} />
          <EssentialsSection essentials={essentials} />
        </section>

        <div className="max-w-7xl mx-auto overflow-x-hidden">
          <section id="shop" className="w-full mt-16 md:mt-24 space-y-14 px-3 sm:px-0">
            <ProductSection title="Our Bestsellers" products={products} />
            <ProductSection title="Under $25" products={under25Products} />
          </section>

          <section className="w-full mt-16 md:mt-24">
            <PromoSection />
          </section>

          <section className="w-full mt-20 md:mt-24">
            <FeaturesSection features={features} />
          </section>

          <section id="offer" className="w-full mt-20 md:mt-24">
            <OfferSection />
          </section>

          <section id="blog" className="w-full mt-20 md:mt-24">
            <BlogSection blogs={blogs} />
          </section>

          <section className="w-full mt-20 md:mt-24 pb-16">
            <RecentlyViewed />
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;