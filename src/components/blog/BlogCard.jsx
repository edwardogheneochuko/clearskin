import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className="text-center group cursor-pointer"
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition"
        />
      </div>

      <h3 className="text-xl font-semibold mt-4">
        {blog.title}
      </h3>

      <p className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-2">
        {blog.linkText}
        <ArrowRight size={16} />
      </p>
    </article>
  );
};

export default BlogCard;