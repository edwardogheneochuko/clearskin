import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "@/utils/firebase";
import useAuthStore from "@/store/authStore";
import { User, MapPin, ShoppingBag, Lock, Camera, Loader } from "lucide-react";
import toast from "react-hot-toast";

import ProfileTab   from "./tabs/ProfileTab";
import OrdersTab    from "./tabs/OrdersTab";
import AddressesTab from "./tabs/AddressesTab";
import PasswordTab  from "./tabs/PasswordTab";

const TABS = [
  { key: "profile",   label: "Profile",         icon: User        },
  { key: "orders",    label: "Order History",    icon: ShoppingBag },
  { key: "addresses", label: "Addresses",        icon: MapPin      },
  { key: "password",  label: "Change Password",  icon: Lock        },
];

const UserProfile = () => {
  const user    = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [active, setActive]               = useState("profile");
  const [avatarUrl, setAvatarUrl]         = useState(user?.photoURL || null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    const storageRef = ref(storage, `avatars/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        toast.error("Upload failed");
        setUploadProgress(null);
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
        setAvatarUrl(downloadURL);
        setUser({ ...user, photoURL: downloadURL });
        setUploadProgress(null);
        toast.success("Avatar updated");
      }
    );
  };

  const renderTab = () => {
    switch (active) {
      case "profile":   return <ProfileTab />;
      case "orders":    return <OrdersTab />;
      case "addresses": return <AddressesTab />;
      case "password":  return <PasswordTab />;
      default:          return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10 mt-20">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <div className="relative shrink-0">
            <div
              onClick={handleAvatarClick}
              className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-xl cursor-pointer overflow-hidden ring-2 ring-pink-200 hover:ring-pink-400 transition"
            >
              {uploadProgress !== null ? (
                <div className="flex flex-col items-center justify-center w-full h-full bg-black/40">
                  <Loader size={18} className="text-white animate-spin" />
                  <span className="text-white text-[10px] mt-1">{uploadProgress}%</span>
                </div>
              ) : avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.[0] || user?.email?.[0]?.toUpperCase()
              )}
            </div>

            {uploadProgress === null && (
              <button
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow cursor-pointer hover:bg-neutral-700 transition"
              >
                <Camera size={12} />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{user?.name || "My Account"}</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <button
              onClick={handleAvatarClick}
              className="text-xs text-pink-400 hover:underline cursor-pointer mt-0.5"
            >
              Change photo
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-56 shrink-0">
            <div className="bg-white rounded-2xl border shadow-sm p-3 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer
                    ${active === tab.key
                      ? "bg-pink-50 text-pink-500"
                      : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 bg-white rounded-2xl border shadow-sm p-6">
            {renderTab()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;