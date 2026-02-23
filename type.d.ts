import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

//User Type
interface User {
  id: number;
  name: string;
  currency: string;
  startingBalance: number;
  createdAt: string;
}

//Button Type
declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?:
    | "danger"
    | "outline"
    | "success"
    | "light"
    | "dark"
    | "blue"
    | "green";
  textVariant?: "danger" | "success" | "light" | "dark";
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  subtitle?: string;
}

type TransactionType = "income" | "expense";

type Period = "week" | "month" | "year";
type FilterType = "expense" | "income";

type TransactionCategory =
  | "salary"
  | "freelance"
  | "gift"
  | "investment"
  | "food"
  | "transport"
  | "shopping"
  | "entertainment"
  | "bills"
  | "health"
  | "education"
  | "rent"
  | "travel"
  | "insurance"
  | "pets"
  | "subscriptions"
  | "groceries"
  | "donations"
  | "savings"
  | "other";

interface Transaction {
  id: string;
  title: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  transactionDate: string;
  note?: string;
}

declare interface CategoryBudget {
  category: TransactionCategory;
  spent: number;
}

declare interface BudgetData {
  monthlyBudget: number;
  totalSpent: number;
  categoryBudgets: CategoryBudget[];
}

declare interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string; // ISO date string
  remindMe: boolean;
  isRecurring?: boolean;
}

export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
  icon: string;
  createdAt: string;
}
