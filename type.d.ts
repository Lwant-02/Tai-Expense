import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "danger" | "outline" | "success" | "light" | "dark";
  textVariant?: "danger" | "success" | "light" | "dark";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  isLoading?: boolean;
}

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  subtitle?: string;
}

type TransactionType = "income" | "expense";

type Period = "day" | "week" | "month" | "year";
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
  date: string;
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
  frequency?: "monthly" | "one-time";
}
