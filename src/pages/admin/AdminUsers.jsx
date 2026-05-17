import useCartStore from "@/store/cartStore";

const AdminUsers = () => {
  const carts = useCartStore((s) => s.carts);
  const favorites = useCartStore((s) => s.favorites);

  const userIds = [...new Set([...Object.keys(carts), ...Object.keys(favorites)])];

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {userIds.length === 0 ? (
        <p className="text-center text-gray-400 py-16 text-sm">No users yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-6 py-3 font-medium">User ID</th>
                <th className="px-6 py-3 font-medium">Cart Items</th>
                <th className="px-6 py-3 font-medium">Favorites</th>
                <th className="px-6 py-3 font-medium">Cart Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userIds.map((uid) => {
                const cart = carts[uid] || [];
                const favs = favorites[uid] || [];
                const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
                return (
                  <tr key={uid} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs truncate max-w-[200px]">{uid}</td>
                    <td className="px-6 py-4">{cart.reduce((a, i) => a + i.quantity, 0)}</td>
                    <td className="px-6 py-4">{favs.length}</td>
                    <td className="px-6 py-4 font-semibold">${total.toFixed(2)}</td>
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