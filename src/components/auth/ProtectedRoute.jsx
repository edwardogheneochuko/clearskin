import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { isAdmin } from "@/utils/adminConfig";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (isAdmin(user.email)) return <Navigate to="/admin" replace />;

  return <Outlet />;
};

export default ProtectedRoute;