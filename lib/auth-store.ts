import { create } from "zustand";
import api, { setAuthToken } from "./api";

interface AuthState {
  user: any | null;
  token: string | null;
  hydrated: boolean;
  initialize: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,

  initialize: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuthToken(token);
      set({
        token,
        user: JSON.parse(user),
        hydrated: true,
      });
    } else {
      set({ hydrated: true });
    }
  },

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken, user } = res.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthToken(accessToken);

    set({
      user,
      token: accessToken,
      hydrated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    set({ user: null, token: null, hydrated: true });
  },
}));

