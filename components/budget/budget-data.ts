import { BudgetData } from "@/type";

export const SAMPLE_BUDGET: BudgetData = {
  monthlyBudget: 2450,
  totalSpent: 1680,
  categoryBudgets: [
    { category: "food", spent: 750 },
    { category: "rent", spent: 675 },
    { category: "transport", spent: 135 },
    { category: "entertainment", spent: 120 },
    { category: "shopping", spent: 210 },
    { category: "bills", spent: 85 },
  ],
};

export const EMPTY_BUDGET: BudgetData = {
  monthlyBudget: 0,
  totalSpent: 0,
  categoryBudgets: [],
};
