import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  // ⏳ While checking session, don't redirect yet
  if (loading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  // 🔐 If no user, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If user exists, render child routes
  return <Outlet />;
}