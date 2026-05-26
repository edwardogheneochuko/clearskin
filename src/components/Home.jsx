import content from "@/assets/data/content.json";
import HeroSection from "./home/HeroSection";
import EssentialsSection from "./home/EssentialsSection";
import ProductSection from "./home/ProductSection";
import PromoSection from "./home/PromoSection";
import FeaturesSection from "./home/FeaturesSection";
import OfferSection from "./home/OfferSection";
import BlogSection from "./home/BlogSection";
import RecentlyViewed from "@/components/ui/RecentlyViewed";

const Home = () => {
  const {
    hero, essentials, products, under25Products,features,blogs, } = content;

  return (
    <div
      className="
        min-h-screen bg-white dark:bg-gradient-to-b
        dark:from-black dark:via-gray-950 dark:to-gray-900 transition-all duration-300
      ">
      <div className=" max-w-7xl  mx-auto
          px-4
          sm:px-6
          lg:px-8
          overflow-x-hidden
        "
      >
        {/* Hero + Essentials */}
        <section
          id="collection"
          className="w-full space-y-12 md:space-y-16"
        >
          <HeroSection hero={hero} />
          <EssentialsSection essentials={essentials} />
        </section>

        {/* Products */}
        <section
          id="shop"
          className="
            w-full
            mt-16 md:mt-24
            space-y-14
          "
        >
          <ProductSection
            title="Our Bestsellers"
            products={products}
          />

          <ProductSection
            title="Under $25"
            products={under25Products}
          />
        </section>

        {/* Promo */}
        <section
          className="
            w-full
            mt-16 md:mt-24
          "
        >
          <PromoSection />
        </section>

        {/* Features */}
        <section
          className="
            w-full
            mt-20 md:mt-24
          "
        >
          <FeaturesSection features={features} />
        </section>

        {/* Offer */}
        <section
          id="offer"
          className="
            w-full
            mt-20 md:mt-24
          "
        >
          <OfferSection />
        </section>

        {/* Blog */}
        <section
          id="blog"
          className="
            w-full
            mt-20 md:mt-24
          "
        >
          <BlogSection blogs={blogs} />
        </section>

        <section
          className="
            w-full
            mt-20 md:mt-24
            pb-20
          "
        >
          <RecentlyViewed />
        </section>
      </div>
    </div>
  );
};

export default Home;