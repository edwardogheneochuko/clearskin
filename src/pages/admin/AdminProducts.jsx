import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import useAdminStore from "@/store/adminStore";
import toast from "react-hot-toast";

const EMPTY = { title: "", price: "", oldPrice: "", badge: "", image: "", details: "", rating: 5, category: "products" };

const AdminProducts = () => {
  const products = useAdminStore((s) => s.products);
  const addProduct = useAdminStore((s) => s.addProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ ...p }); setModal(true); };

  const handleSave = () => {
    if (!form.title || !form.price) {
      toast.error("Title and price are required");
      return;
    }
    if (editing !== null) {
      updateProduct(editing, { ...form, price: Number(form.price), oldPrice: Number(form.oldPrice) || undefined });
      toast.success("Product updated");
    } else {
      addProduct({ ...form, price: Number(form.price), oldPrice: Number(form.oldPrice) || undefined });
      toast.success("Product added");
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    toast.success("Product deleted");
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                      <span className="font-medium line-clamp-1">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">${p.price}</td>
                  <td className="px-6 py-4 capitalize">{p.category}</td>
                  <td className="px-6 py-4">{p.rating}/5</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer transition">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 cursor-pointer transition">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">{editing ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setModal(false)} className="cursor-pointer text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: "Title",       key: "title",    type: "text"   },
                { label: "Price",       key: "price",    type: "number" },
                { label: "Old Price",   key: "oldPrice", type: "number" },
                { label: "Badge",       key: "badge",    type: "text"   },
                { label: "Image URL",   key: "image",    type: "text"   },
                { label: "Details",     key: "details",  type: "text"   },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="products">Products</option>
                  <option value="under25">Under $25</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Rating (1–5)</label>
                <input
                  type="number"
                  min={1} max={5}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModal(false)}
                className="flex-1 py-2 rounded-xl border text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
              >
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