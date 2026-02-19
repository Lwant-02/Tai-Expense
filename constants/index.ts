import onboardingOne from "@/assets/images/onboarding-one.png";
import onboardingThree from "@/assets/images/onboarding-three.png";
import onboardingTwo from "@/assets/images/onboarding-two.png";
import { TransactionCategory } from "@/type";
import { Ionicons } from "@expo/vector-icons";

export const ONBOARDING_SCREEN = [
  {
    id: 1,
    image: onboardingOne,
    title: "title_1",
    description: "description_1",
  },
  {
    id: 2,
    image: onboardingTwo,
    title: "title_2",
    description: "description_2",
  },
  {
    id: 3,
    image: onboardingThree,
    title: "title_3",
    description: "description_3",
  },
];

export const CATEGORY_CONFIG: Record<
  TransactionCategory,
  { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }
> = {
  salary: { icon: "briefcase", color: "#22C55E", bg: "bg-green/10" },
  freelance: { icon: "laptop-outline", color: "#22C55E", bg: "bg-green/10" },
  gift: { icon: "gift-outline", color: "#A78BFA", bg: "bg-[#A78BFA]/10" },
  investment: {
    icon: "trending-up",
    color: "#2563EB",
    bg: "bg-blue/10",
  },
  food: { icon: "restaurant-outline", color: "#F59E0B", bg: "bg-[#F59E0B]/10" },
  transport: { icon: "car-outline", color: "#2563EB", bg: "bg-blue/10" },
  shopping: { icon: "bag-outline", color: "#EC4899", bg: "bg-[#EC4899]/10" },
  entertainment: {
    icon: "game-controller-outline",
    color: "#8B5CF6",
    bg: "bg-[#8B5CF6]/10",
  },
  bills: { icon: "receipt-outline", color: "#F56565", bg: "bg-danger/10" },
  health: { icon: "heart-outline", color: "#F56565", bg: "bg-danger/10" },
  education: { icon: "book-outline", color: "#2563EB", bg: "bg-blue/10" },
  other: {
    icon: "ellipsis-horizontal",
    color: "#8E8E93",
    bg: "bg-[#8E8E93]/10",
  },
  rent: { icon: "home-outline", color: "#F97316", bg: "bg-[#F97316]/10" },
  travel: {
    icon: "airplane-outline",
    color: "#0EA5E9",
    bg: "bg-[#0EA5E9]/10",
  },
  insurance: {
    icon: "shield-checkmark-outline",
    color: "#6366F1",
    bg: "bg-[#6366F1]/10",
  },
  pets: { icon: "paw-outline", color: "#D97706", bg: "bg-[#D97706]/10" },
  subscriptions: {
    icon: "card-outline",
    color: "#E11D48",
    bg: "bg-[#E11D48]/10",
  },
  groceries: {
    icon: "cart-outline",
    color: "#16A34A",
    bg: "bg-[#16A34A]/10",
  },
  donations: {
    icon: "heart-half-outline",
    color: "#DB2777",
    bg: "bg-[#DB2777]/10",
  },
  savings: {
    icon: "wallet-outline",
    color: "#0D9488",
    bg: "bg-[#0D9488]/10",
  },
};

export const CATEGORIES: TransactionCategory[] = [
  "food",
  "transport",
  "shopping",
  "entertainment",
  "bills",
  "health",
  "education",
  "rent",
  "travel",
  "insurance",
  "pets",
  "subscriptions",
  "groceries",
  "donations",
  "savings",
  "salary",
  "freelance",
  "gift",
  "investment",
  "other",
];

export const BANNERS = [
  {
    id: "1",
    title: "banner.strategies.rule_50_30_20.title",
    description: "banner.strategies.rule_50_30_20.description",
    icon: "pie-chart-outline",
    color: "#22C55E",
    bgColor: "bg-foreground",
  },
  {
    id: "2",
    title: "banner.strategies.emergency_fund.title",
    description: "banner.strategies.emergency_fund.description",
    icon: "shield-checkmark-outline",
    color: "#F59E0B",
    bgColor: "bg-foreground",
  },
  {
    id: "3",
    title: "banner.strategies.track_expenses.title",
    description: "banner.strategies.track_expenses.description",
    icon: "trending-up-outline",
    color: "#2563EB",
    bgColor: "bg-foreground",
  },
];

export const CURRENCIES = [
  { symbol: "$", code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { symbol: "€", code: "EUR", name: "Euro", flag: "🇪🇺" },
  { symbol: "¥", code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { symbol: "$", code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { symbol: "Ks", code: "MMK", name: "Myanmar Kyat", flag: "🇲🇲" },
  { symbol: "฿", code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { symbol: "$", code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { symbol: "¥", code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
];
