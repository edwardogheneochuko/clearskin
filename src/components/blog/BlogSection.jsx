import BlogCard from "./BlogCard";

const BlogSection = ({ blogs = [] }) => {
  return (
    <section className="my-20 px-4 md:px-10">
      <h2 className="text-center text-4xl mb-12 font-semibold">
        More to Discover
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;