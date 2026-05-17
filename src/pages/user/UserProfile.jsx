import { useState, useEffect } from "react";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import { User, MapPin, ShoppingBag, Lock } from "lucide-react";
import toast from "react-hot-toast";

const TABS = [
  { key: "profile",   label: "Profile",       icon: User       },
  { key: "orders",    label: "Order History",  icon: ShoppingBag},
  { key: "addresses", label: "Addresses",      icon: MapPin     },
  { key: "password",  label: "Change Password",icon: Lock       },
];

const UserProfile = () => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [active, setActive] = useState("profile");

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  // Cart as orders
  const cartsMap = useCartStore((s) => s.carts);
  const cart = cartsMap[user?.uid || "guest"] || [];

  const handleSaveProfile = async () => {
    if (!name.trim()) { toast.error("Name cannot be empty"); return; }
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name.trim() });
      setUser({ ...user, name: name.trim() });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPw || !newPw) { toast.error("Fill in both fields"); return; }
    if (newPw.length < 6) { toast.error("New password must be at least 6 characters"); return; }
    setChangingPw(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPw);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPw);
      toast.success("Password changed successfully");
      setCurrentPw(""); setNewPw("");
    } catch (err) {
      toast.error(err.code === "auth/wrong-password" ? "Current password is incorrect" : "Failed to change password");
    } finally {
      setChangingPw(false);
    }
  };

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    setAddresses([...addresses, newAddress.trim()]);
    setNewAddress("");
    toast.success("Address saved");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10 mt-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-xl">
            {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name || "My Account"}</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs */}
          <aside className="md:w-56 shrink-0">
            <div className="bg-white rounded-2xl border shadow-sm p-3 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer
                    ${active === tab.key ? "bg-pink-50 text-pink-500" : "text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl border shadow-sm p-6">

            {/* PROFILE */}
            {active === "profile" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Email</label>
                  <input
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="mt-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition cursor-pointer disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {/* ORDERS */}
            {active === "orders" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Order History</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-10">No items in cart yet</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border">
                        <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="border-t pt-3 flex justify-between font-semibold text-sm">
                      <span>Total</span>
                      <span>${cart.reduce((a, i) => a + i.price * i.quantity, 0).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES */}
            {active === "addresses" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter an address"
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    onClick={handleAddAddress}
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
                        <span>{addr}</span>
                        <button
                          onClick={() => setAddresses(addresses.filter((_, idx) => idx !== i))}
                          className="text-red-400 hover:text-red-500 text-xs cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PASSWORD */}
            {active === "password" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Min 6 characters"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  disabled={changingPw}
                  className="bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition cursor-pointer disabled:opacity-60"
                >
                  {changingPw ? "Changing..." : "Change Password"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;