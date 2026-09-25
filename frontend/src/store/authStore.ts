import { create } from "zustand";
import { api } from "../lib/api";

type User = {
  _id: string;
  username: string;
  email: string;
};

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;

  getMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  // Restore existing login session
  getMe: async () => {
    try {
      const response = await api.get("/api/auth/get-me");

      console.log("GET ME RESPONSE:", response.data);

      set({
        user: response.data.user,
        initialized: true,
      });
    } catch (error: any) {
      console.log("No active session");

      console.error("GET ME ERROR:", error?.response?.data);

      set({
        user: null,
        initialized: true,
      });
    }
  },

  // Login
  login: async (email: string, password: string) => {
    try {
      set({ loading: true });

      console.log("LOGIN REQUEST:", {
        email: email.trim(),
        passwordLength: password.length,
      });

      const response = await api.post("/api/auth/login", {
        email: email.trim(),
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      set({
        user: response.data.user,
        loading: false,
        initialized: true,
      });

      return true;
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("RESPONSE:", error?.response?.data);

      set({
        user: null,
        loading: false,
        initialized: true,
      });

      return false;
    }
  },

  // Register
  register: async (data) => {
    try {
      set({ loading: true });

      console.log("REGISTER REQUEST:", {
        username: data.username,
        email: data.email,
      });

      const response = await api.post("/api/auth/register", data);

      console.log("REGISTER RESPONSE:", response.data);

      // Registration creates the account but does not log the user in.
      set({
        loading: false,
        initialized: true,
      });

      return true;
    } catch (error: any) {
      console.error("REGISTER ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("RESPONSE:", error?.response?.data);

      set({
        loading: false,
        user: null,
        initialized: true,
      });

      return false;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error: any) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      set({
        user: null,
        initialized: true,
      });
    }
  },
}));