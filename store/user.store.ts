import { User } from "@/type";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  setUserBalance: (balance: number) => void;
  setUserName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  setUserBalance: (balance: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, startingBalance: balance } : null,
    })),
  setUserName: (name: string) =>
    set((state) => ({
      user: state.user ? { ...state.user, name } : null,
    })),
}));
