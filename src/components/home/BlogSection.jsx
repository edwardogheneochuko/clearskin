import { ArrowRight } from "lucide-react";

const BlogSection = ({ blogs }) => {
  return (
    <div className="my-20">
      <h2 className="text-center text-4xl mb-12 font-semibold">
        More to Discover
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((item, index) => (
          <article key={index} className="text-center group">
            <img src={item.image} className="mb-4" />
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>

            <p className="flex justify-center items-center gap-2">
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