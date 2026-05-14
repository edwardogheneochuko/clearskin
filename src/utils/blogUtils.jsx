import content from "@/assets/data/content.json";

export const getBlogBySlug = (slug) => {
  return content.blogs.find(
    (b) =>
      b.slug?.toLowerCase() === slug?.toLowerCase()
  );
};

export const getRelatedBlogs = (blog, limit = 3) => {
  if (!blog) return [];

  return content.blogs
    .filter(
      (b) =>
        b.category === blog.category &&
        b.slug !== blog.slug
    )
    .slice(0, limit);
};