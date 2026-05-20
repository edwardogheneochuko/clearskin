import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import useCartStore from "@/store/cartStore";

const AdminUsers = () => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);

  const carts     = useCartStore((s) => s.carts);
  const favorites = useCartStore((s) => s.favorites);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map((doc) => doc.data());
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-10 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {users.length === 0 ? (
        <p className="text-center text-gray-400 py-16 text-sm">No users yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Cart Items</th>
                <th className="px-6 py-3 font-medium">Favorites</th>
                <th className="px-6 py-3 font-medium">Cart Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => {
                const cart  = carts[user.uid]     || [];
                const favs  = favorites[user.uid] || [];
                const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

                return (
                  <tr key={user.uid} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            loading="lazy"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-sm">
                            {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium truncate max-w-[120px]">
                          {user.name || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 truncate max-w-[180px]">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      {cart.reduce((a, i) => a + i.quantity, 0)}
                    </td>
                    <td className="px-6 py-4">{favs.length}</td>
                    <td className="px-6 py-4 font-semibold">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;