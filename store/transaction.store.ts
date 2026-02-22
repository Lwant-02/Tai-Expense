import { TransactionSummary } from "@/actions/transaction";
import { Transaction } from "@/type";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  summary: TransactionSummary;
  isLoading: boolean;
  setTransactions: (transactions: Transaction[]) => void;
  setSummary: (summary: TransactionSummary) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  summary: { totalIncome: 0, totalExpense: 0, pastIncome: 0, pastExpense: 0 },
  isLoading: true,
  setTransactions: (transactions) => set({ transactions }),
  setSummary: (summary) => set({ summary }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
