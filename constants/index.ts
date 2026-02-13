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
};
