import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const getMe = useAuthStore((s) => s.getMe);

  // ✅ Restore user from cookie when app loads
  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/interview/:id" element={<Interview />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}