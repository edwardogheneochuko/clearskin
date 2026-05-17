import { useState } from "react";
import { MapPin } from "lucide-react";
import useUserStore from "@/store/userStore";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const AddressesTab = () => {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid || "guest";

  const getAddresses  = useUserStore((s) => s.getAddresses);
  const addAddress    = useUserStore((s) => s.addAddress);
  const removeAddress = useUserStore((s) => s.removeAddress);

  const addresses = getAddresses(userId);
  const [newAddress, setNewAddress] = useState("");

  const handleAdd = () => {
    if (!newAddress.trim()) return;
    addAddress(userId, newAddress.trim());
    setNewAddress("");
    toast.success("Address saved");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Enter an address"
          className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
        >
          Add
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No addresses saved</p>
      ) : (
        <div className="space-y-2">
          {addresses.map((addr, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-pink-400 shrink-0" />
                <span>{addr}</span>
              </div>
              <button
                onClick={() => removeAddress(userId, i)}
                className="text-red-400 hover:text-red-500 text-xs cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesTab;