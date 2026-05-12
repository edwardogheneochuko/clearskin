import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const BlogSection = ({ blogs = [] }) => {
  const navigate = useNavigate();

  const [blogList, setBlogList] = useState(() => {
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, image: reader.result }));
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

    const newBlog = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      image: form.image,
      slug: form.title.toLowerCase().replace(/\s+/g, "-"),
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
      <h2 className="text-center text-3xl md:text-4xl mb-10 font-semibold">
        Blog
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {blogList.map((item) => (
          <article
            key={item.id}
            onClick={() => navigate(`/blog/${item.slug}`)}
            className="cursor-pointer group text-center"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition"
            />

            <h3 className="text-xl font-semibold mt-4">
              {item.title}
            </h3>

            <p className="flex justify-center items-center gap-2 text-sm text-gray-600 mt-2">
              {item.linkText}
              <ArrowRight size={16} />
            </p>

          </article>
        ))}

      </div>

      <h2 className="text-center my-10 text-3xl md:text-4xl font-semibold">
        Create Blog
      </h2>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="max-w-3xl mx-auto border-2 border-dashed rounded-xl p-6 text-center bg-gray-50"
      >

        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          className="hidden"
          onChange={(e) => handleImage(e.target.files[0])}
        />

        {!preview ? (
          <label htmlFor="imageUpload" className="cursor-pointer">
            <p className="text-gray-500">
              Drag & drop image here or click to upload
            </p>
          </label>
        ) : (
          <img
            src={preview}
            alt="preview"
            className="w-full h-64 object-cover rounded-xl"
          />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto mt-6 space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="content"
          placeholder="Blog content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800
          cursor-pointer"
        >
          Publish Blog
        </button>

      </form>

    </section>
  );
};

export default BlogSection;