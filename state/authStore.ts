import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  email?: string;
  name?: string;
  username: string;
  userType?: string;
}

interface authState {
  data: User | null;
  setAuth: (data: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      data: null,
      setAuth: (data: User) => set({ data }),
      clearAuth: () => set({ data: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
