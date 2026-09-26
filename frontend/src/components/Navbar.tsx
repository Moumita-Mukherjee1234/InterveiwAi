import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isHome = location.pathname === "/home";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#282072] to-[#03B3C5] text-white shadow-md transition-transform duration-200 group-hover:scale-105">
            <span className="text-lg font-bold">AI</span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#282072]">
              Interview<span className="text-[#03B3C5]">AI</span>
            </h1>

            <p className="hidden text-[11px] font-medium text-gray-400 sm:block">
              Your AI Interview Coach
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            to="/home"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              isHome
                ? "bg-[#282072]/10 text-[#282072]"
                : "text-gray-500 hover:bg-gray-100 hover:text-[#282072]"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/home"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-[#282072]"
          >
            History
          </Link>
        </nav>

        {/* User section */}
        <div className="flex items-center gap-4">

          {/* User info */}
          {user && (
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#282072] to-[#03B3C5] text-sm font-bold text-white">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <div className="hidden lg:block">
                <p className="max-w-[140px] truncate text-sm font-semibold text-gray-800">
                  {user.username}
                </p>

                <p className="max-w-[160px] truncate text-xs text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}