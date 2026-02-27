import { BudgetData } from "@/type";
import { create } from "zustand";

interface BudgetState {
  budgetData: BudgetData | null;
  setBudgetData: (data: BudgetData) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  budgetData: null,
  setBudgetData: (data: BudgetData) => set({ budgetData: data }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
