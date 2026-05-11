import { ArrowRight } from "lucide-react";

const BlogSection = ({ blogs = [] }) => {
  return (
    <div className="my-20 px-4 md:px-10">
      
      <h2 className="text-center text-4xl mb-12 font-semibold">
        More to Discover
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {blogs.map((item) => (
          <article
            key={item.title}
            className="text-center group cursor-pointer"
          >
            
            <div className="overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.alt || item.title}
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="text-2xl font-semibold mt-4 mb-3">
              {item.title}
            </h3>

            <p className="flex justify-center items-center gap-2 text-sm text-gray-600 group-hover:text-black transition">
              {item.linkText}
              <ArrowRight size={16} />
            </p>

          </article>
        ))}

      </div>
    </div>
  );
};

export default BlogSection;