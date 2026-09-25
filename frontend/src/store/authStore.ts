import { create } from "zustand";
import { api } from "../lib/api";

type User = {
  _id: string;
  name: string;
  email: string;
};

interface AuthState {
  user: User | null;
  loading: boolean;

  getMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  // Restore session
  getMe: async () => {
    try {
      const res = await api.get("/api/auth/get-me");
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true });

      await api.post("/api/auth/login", { email, password });

      const res = await api.get("/api/auth/get-me");

      set({ user: res.data.user, loading: false });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      set({ loading: false });
      return false;
    }
  },

  register: async (data) => {
    try {
      set({ loading: true });

      await api.post("/api/auth/register", data);

      const res = await api.get("/api/auth/get-me");

      set({ user: res.data.user, loading: false });
      return true;
    } catch (error) {
      console.error("Register failed:", error);
      set({ loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      set({ user: null });
    }
  },
}));