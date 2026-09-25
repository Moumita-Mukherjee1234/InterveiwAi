import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-8">
      {/* Logo */}
      <h1 className="text-xl font-bold text-[#282072]">Interview AI</h1>

      {/* Links */}
      <div className="flex gap-8 text-sm font-medium">
        <Link to="/home" className="text-[#282072] hover:text-[#03B3C5]">
          Home
        </Link>

        <Link to="/home" className="text-gray-500 hover:text-[#03B3C5]">
          History
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-sm text-red-500 font-semibold"
      >
        Logout
      </button>
    </div>
  );
}