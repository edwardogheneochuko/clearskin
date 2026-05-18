import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { BlogDetailsSkeleton } from "../ui/Skeleton";

import { getBlogBySlug, getRelatedBlogs } from "@/utils/blogUtils";

const BlogDetails = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  const blog = getBlogBySlug(slug);

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    return getRelatedBlogs(blog, 3);
  }, [blog]);

  if (loading) return <BlogDetailsSkeleton />;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Invalid blog URL
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="min-h-screen px-4 pt-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm text-pink-500">{blog.category}</p>

          <h1 className="mb-4 text-2xl font-semibold md:text-4xl">
            {blog.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-500">
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
          </div>

          <img
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            className="mb-8 h-72 w-full rounded-2xl object-cover"
          />

          <div className="prose prose-pink max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>

          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-xl font-semibold">Related Articles</h2>

              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {relatedBlogs.map((item) => (
                  <motion.div key={item.slug} whileHover={{ scale: 1.02 }}>
                    <Link
                      to={`/blog/${item.slug}`}
                      className="block overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-40 w-full object-cover transition hover:scale-105"
                      />
                      <div className="p-4">
                        <h3 className="line-clamp-2 text-sm font-medium hover:text-pink-500">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs text-gray-500">{item.date}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default BlogDetails;