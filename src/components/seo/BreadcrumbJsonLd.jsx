import { Helmet } from "react-helmet-async";

const BreadcrumbJsonLd = ({ items }) => {
  const structured = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://clearskin.com${item.path}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structured)}</script>
    </Helmet>
  );
};

export default BreadcrumbJsonLd;