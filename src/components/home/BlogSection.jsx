import { useNavigate } from "react-router-dom";
import { ArrowRight, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";

const BlogSection = ({ blogs = [] }) => {
  const navigate = useNavigate();

  const [blogList, setBlogList] = useState(() => {
    if (typeof window === "undefined") return blogs;

    const saved = localStorage.getItem("blogs");
    return saved ? JSON.parse(saved) : blogs;
  });

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogList));
  }, [blogList]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.image) return;

    const slug = `${form.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")}-${Date.now()}`;

    const newBlog = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      image: form.image,
      slug,
      linkText: "Read Article",
    };

    setBlogList((prev) => [newBlog, ...prev]);

    setForm({
      title: "",
      content: "",
      image: "",
    });

    setPreview(null);
  };

  return (
    <section className="my-20 px-4 md:px-10">
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl mb-12 font-bold tracking-tight text-gray-900 dark:text-pink-400">
        Blog
      </h2>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogList.map((item) => (
          <article
            key={item.id}
            onClick={() => navigate(`/blog/${item.slug}`)}
            className="cursor-pointer group rounded-3xl overflow-hidden
            bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950
            shadow-sm hover:shadow-xl
            border border-gray-100 dark:border-gray-800
            transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover
                group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-pink-300">
                {item.title}
              </h3>

              <p
                className="flex justify-center items-center gap-2
                text-sm font-medium mt-3
                text-gray-600 dark:text-gray-400
                group-hover:text-pink-500 transition"
              >
                {item.linkText}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Create Blog Heading */}
      <h2 className="text-center my-14 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-pink-400">
        Create Blog
      </h2>

      {/* Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="max-w-3xl mx-auto border-2 border-dashed rounded-3xl p-8
        text-center bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950
        border-gray-300 dark:border-gray-700
        shadow-sm hover:shadow-lg transition-all"
      >
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          className="hidden"
          onChange={(e) => handleImage(e.target.files[0])}
        />

        {!preview ? (
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <UploadCloud
              size={42}
              className="text-gray-500 dark:text-pink-400"
            />
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Drag & drop image here or click to upload
            </p>
          </label>
        ) : (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto mt-8 space-y-5"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-4 rounded-2xl
          bg-white dark:bg-gray-950
          text-black dark:text-pink-200
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-pink-400
          transition"
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="Write your blog content..."
          value={form.content}
          onChange={handleChange}
          className="w-full border p-4 rounded-2xl h-36 resize-none
          bg-white dark:bg-gray-950
          text-black dark:text-pink-200
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-pink-400
          transition"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl
          bg-black dark:bg-pink-500
          text-white font-medium text-lg
          hover:bg-gray-800 dark:hover:bg-pink-600
          shadow-md hover:shadow-lg
          transition-all duration-300
          cursor-pointer"
        >
          Publish Blog
        </button>
      </form>
    </section>
  );
};

export default BlogSection;