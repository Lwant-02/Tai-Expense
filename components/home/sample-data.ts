import { SavingGoal } from "@/type";

export const MOCK_GOALS: SavingGoal[] = [
  {
    id: "1",
    title: "New Car",
    targetAmount: 20000,
    currentAmount: 5000,
    color: "#4ade80",
    icon: "car-outline",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Vacation",
    targetAmount: 5000,
    currentAmount: 3000,
    color: "#60a5fa",
    icon: "airplane-outline",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 8500,
    color: "#f87171",
    icon: "medical-outline",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "New Laptop",
    targetAmount: 2000,
    currentAmount: 500,
    color: "#c084fc",
    icon: "laptop-outline",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "House Deposit",
    targetAmount: 50000,
    currentAmount: 15000,
    color: "#fbbf24",
    icon: "home-outline",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
