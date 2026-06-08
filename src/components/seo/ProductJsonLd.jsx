import { Helmet } from "react-helmet-async";

const ProductJsonLd = ({ product }) => {
  if (!product) return null;

  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.details,
    sku: String(product.id),
    brand: {
      "@type": "Brand",
      name: "ClearSkin",
    },
    offers: {
      "@type": "Offer",
      url: `https://clearskin.com/product/${product.slug || product.id}`,
      priceCurrency: "USD",
      price: product.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ClearSkin",
      },
    },
    aggregateRating: product.reviews
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };

  const clean = JSON.parse(JSON.stringify(structured));

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(clean)}</script>
    </Helmet>
  );
};

export default ProductJsonLd;