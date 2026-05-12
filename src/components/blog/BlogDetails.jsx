import { useParams } from "react-router-dom";
import content from "@/assets/data/content.json";

const BlogDetails = () => {
  const { slug } = useParams();

  const blog = content.blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 pt-25">
      <div className="max-w-5xl mx-auto">

        <p className="text-sm text-pink-500 mb-2">
          {blog.category}
        </p>

        <h1 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">
          {blog.title}
        </h1>

        <div className="text-sm text-gray-500 mb-6 flex gap-4 flex-wrap">
          <span>By {blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full md:w-1/2 h-64  object-cover rounded-2xl"
          />

          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line md:w-1/2">
            {blog.content}
          </p>

        </div>

      </div>
    </div>
  );
};

export default BlogDetails;