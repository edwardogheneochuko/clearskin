import content from "@/assets/data/content.json";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const allProducts = [
  ...content.products,
  ...content.under25Products,
].map((product, i) => ({
  ...product,
  id: i,
  slug: slugify(product.title),
}));