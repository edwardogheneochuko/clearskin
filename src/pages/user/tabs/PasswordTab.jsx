import { useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

const PasswordTab = () => {
  const user = useAuthStore((s) => s.user);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [changing, setChanging] = useState(false);

  const handleChange = async () => {
    if (!currentPw || !newPw) {
      toast.error("Fill in both fields");
      return;
    }

    if (newPw.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setChanging(true);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPw
      );

      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPw);

      toast.success("Password changed successfully");

      setCurrentPw("");
      setNewPw("");
    } catch (err) {
      toast.error(
        err.code === "auth/wrong-password"
          ? "Current password is incorrect"
          : "Failed to change password"
      );
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Change Password
      </h2>

      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
          Current Password
        </label>

        <input
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
          placeholder="Enter current password"
          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
          New Password
        </label>

        <input
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          placeholder="Min 6 characters"
          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <button
        onClick={handleChange}
        disabled={changing}
        className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 dark:hover:bg-gray-200 transition cursor-pointer disabled:opacity-60"
      >
        {changing ? "Changing..." : "Change Password"}
      </button>
    </div>
  );
};

export default PasswordTab;