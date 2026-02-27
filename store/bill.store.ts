import { Bill } from "@/type";
import { create } from "zustand";

interface BillState {
  bills: Bill[];
  setBills: (bills: Bill[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useBillStore = create<BillState>((set) => ({
  bills: [],
  setBills: (bills: Bill[]) => set({ bills }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
