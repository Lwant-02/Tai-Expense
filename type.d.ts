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
