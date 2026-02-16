import { Bill, BudgetData } from "@/type";

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

export const SAMPLE_BILLS: Bill[] = [
  {
    id: "1",
    title: "Apartment Rent",
    amount: 1200,
    dueDate: new Date(new Date().setDate(25)).toISOString(), // Due on 25th
    remindMe: true,
    frequency: "monthly",
  },
  {
    id: "2",
    title: "Internet",
    amount: 55,
    dueDate: new Date(new Date().setDate(15)).toISOString(), // Due on 15th
    remindMe: true,
    frequency: "monthly",
  },
  {
    id: "3",
    title: "Netflix",
    amount: 15.99,
    dueDate: new Date(new Date().setDate(5)).toISOString(), // Due on 5th
    remindMe: false,
    frequency: "monthly",
  },
  {
    id: "4",
    title: "Car Insurance",
    amount: 145,
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 2),
    ).toISOString(), // Due in 2 days
    remindMe: true,
    frequency: "monthly",
  },
];
