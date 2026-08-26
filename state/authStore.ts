import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/feature/auth/models/authModel";

interface authState {
  data: User | null;
  setAuth: (data?: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      data: null,
      setAuth: (data?: User) => set({ data: data || null }),
      clearAuth: () => set({ data: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
