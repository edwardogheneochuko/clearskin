import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const ProfileTab = () => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
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
        onClick={handleSave}
        disabled={saving}
        className="mt-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition cursor-pointer disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileTab;