import { Helmet } from "react-helmet-async";

const WebsiteJsonLd = () => {
  const structured = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClearSkin",
    url: "https://clearskin.com",
    description: "Clean skincare for healthy everyday skin",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://clearskin.com/explore?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structured)}</script>
    </Helmet>
  );
};

export default WebsiteJsonLd;