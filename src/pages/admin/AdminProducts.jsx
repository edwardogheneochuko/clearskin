import { useState, useMemo } from "react";
import { Pencil, Trash2, Plus, X, Search, ToggleLeft, ToggleRight } from "lucide-react";
import useAdminStore from "@/store/adminStore";
import toast from "react-hot-toast";

const EMPTY = {
  title: "", price: "", oldPrice: "", badge: "",
  image: "", details: "", rating: 5, category: "products",
};

const AdminProducts = () => {
  const products      = useAdminStore((s) => s.products);
  const addProduct    = useAdminStore((s) => s.addProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const toggleStock   = useAdminStore((s) => s.toggleStock);

  const [modal, setModal]         = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ ...p }); setModal(true); };

  const handleSave = () => {
    if (!form.title || !form.price) { toast.error("Title and price are required"); return; }
    if (editing !== null) {
      updateProduct(editing, {
        ...form,
        price:    Number(form.price),
        oldPrice: Number(form.oldPrice) || undefined,
      });
      toast.success("Product updated");
    } else {
      addProduct({
        ...form,
        price:    Number(form.price),
        oldPrice: Number(form.oldPrice) || undefined,
      });
      toast.success("Product added");
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmId(null);
    toast.success("Product deleted");
  };

  const handleToggleStock = (p) => {
    toggleStock(p.id);
    toast(p.inStock ? `${p.title} marked out of stock` : `${p.title} marked in stock`);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "all")    result = result.filter((p) => p.category === category);
    if (stockFilter !== "all") result = result.filter((p) => stockFilter === "in" ? p.inStock : !p.inStock);
    if (search.trim())         result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    return result;
  }, [products, search, category, stockFilter]);

  const inputClass = "w-full px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-transparent dark:border-gray-700";

  return (
    <div className="space-y-5">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-400
                         bg-white dark:bg-gray-800
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer
                       bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="products">Full Size</option>
            <option value="under25">Under $25</option>
          </select>

          {/* ✅ Stock filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer
                       bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       text-gray-900 dark:text-white"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer shrink-0 transition
                     bg-black dark:bg-white text-white dark:text-black
                     hover:bg-neutral-800 dark:hover:bg-gray-200"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        {" · "}
        <span className="text-green-500">{products.filter(p => p.inStock).length} in stock</span>
        {" · "}
        <span className="text-red-400">{products.filter(p => !p.inStock).length} out of stock</span>
      </p>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-16">No products match</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left">
                <tr>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Rating</th>
                  <th className="px-6 py-3 font-medium">Stock</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={p.image} loading="lazy" className={`w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 ${!p.inStock ? "opacity-50" : ""}`} />
                          {!p.inStock && (
                            <div className="absolute inset-0 rounded-lg bg-gray-900/40 flex items-center justify-center">
                              <span className="text-[8px] text-white font-bold">OUT</span>
                            </div>
                          )}
                        </div>
                        <span className={`font-medium line-clamp-1 ${!p.inStock ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-white"}`}>
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span>${p.price}</span>
                        {p.oldPrice && <span className="text-xs text-gray-400 line-through">${p.oldPrice}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-700 dark:text-gray-300">{p.category}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{p.rating}/5</td>
                    <td className="px-6 py-4">
                      {/* ✅ Stock toggle */}
                      <button
                        onClick={() => handleToggleStock(p)}
                        className="flex items-center gap-1.5 cursor-pointer group"
                        title={p.inStock ? "Mark out of stock" : "Mark in stock"}
                      >
                        {p.inStock ? (
                          <ToggleRight size={22} className="text-green-500 group-hover:text-green-600 transition" />
                        ) : (
                          <ToggleLeft size={22} className="text-gray-400 group-hover:text-gray-500 transition" />
                        )}
                        <span className={`text-xs font-medium ${p.inStock ? "text-green-500" : "text-gray-400 dark:text-gray-600"}`}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-pointer transition">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setConfirmId(p.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400 cursor-pointer transition">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm delete modal */}
      {confirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Delete Product</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete this product? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmId(null)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmId)} className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={() => setModal(false)} className="cursor-pointer text-gray-400 hover:text-black dark:hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            {form.image && (
              <div className="mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                <img src={form.image} alt="Preview" loading="lazy" onError={(e) => e.target.style.display = "none"} className="w-full h-40 object-cover" />
              </div>
            )}

            <div className="space-y-3">
              {[
                { label: "Title",     key: "title",    type: "text"   },
                { label: "Price",     key: "price",    type: "number" },
                { label: "Old Price", key: "oldPrice", type: "number" },
                { label: "Badge",     key: "badge",    type: "text"   },
                { label: "Image URL", key: "image",    type: "text"   },
                { label: "Details",   key: "details",  type: "text"   },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">{field.label}</label>
                  <input type={field.type} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className={inputClass} />
                </div>
              ))}

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                  <option value="products">Full Size</option>
                  <option value="under25">Under $25</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Rating (1–5)</label>
                <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputClass} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 py-2 rounded-xl text-sm font-medium transition cursor-pointer bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-gray-200">
                {editing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;