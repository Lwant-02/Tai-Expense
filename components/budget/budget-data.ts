import { BudgetData } from "@/type";

export const SAMPLE_BUDGET: BudgetData = {
  monthlyBudget: 2450,
  totalSpent: 1680,
  categoryBudgets: [
    { category: "food", budgeted: 1000, spent: 750 },
    { category: "rent", budgeted: 1500, spent: 675 },
    { category: "transport", budgeted: 150, spent: 135 },
    { category: "entertainment", budgeted: 400, spent: 120 },
    { category: "shopping", budgeted: 300, spent: 210 },
    { category: "bills", budgeted: 200, spent: 85 },
  ],
};

export const EMPTY_BUDGET: BudgetData = {
  monthlyBudget: 0,
  totalSpent: 0,
  categoryBudgets: [],
};
