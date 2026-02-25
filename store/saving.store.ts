import { SavingGoal } from "@/type";
import { create } from "zustand";

interface SavingState {
  savings: SavingGoal[];
  setSavings: (savings: SavingGoal[]) => void;
  addSaving: (saving: SavingGoal) => void;
  updateSaving: (id: string, updatedSaving: Partial<SavingGoal>) => void;
  updateSavingAmount: (id: string, amountToAdd: number) => void;
  removeSaving: (id: string) => void;
}

export const useSavingStore = create<SavingState>((set) => ({
  savings: [],
  setSavings: (savings: SavingGoal[]) => set({ savings }),
  addSaving: (saving: SavingGoal) =>
    set((state) => ({ savings: [saving, ...state.savings] })),
  updateSaving: (id: string, updatedSaving: Partial<SavingGoal>) =>
    set((state) => ({
      savings: state.savings.map((s) =>
        s.id === id ? { ...s, ...updatedSaving } : s,
      ),
    })),
  updateSavingAmount: (id: string, amountToAdd: number) =>
    set((state) => ({
      savings: state.savings.map((s) =>
        s.id === id
          ? { ...s, currentAmount: s.currentAmount + amountToAdd }
          : s,
      ),
    })),
  removeSaving: (id: string) =>
    set((state) => ({
      savings: state.savings.filter((s) => s.id !== id),
    })),
}));
