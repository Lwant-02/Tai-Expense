import { CURRENCIES } from "@/constants";
import { TransactionType } from "@/type";
import converter from "number-to-words";

const SHAN_UNITS = ["", "သိပ်း", "ပၢၵ်ႇ", "ႁဵင်", "မိုၼ်ႇ", "သႅၼ်", "လၢၼ်ႉ"];
const SHAN_DIGITS = [
  "သုၼ်",
  "ၼိုင်ႈ",
  "သွင်",
  "သၢမ်",
  "သီႇ",
  "ႁႃႈ",
  "ႁူၵ်း",
  "ၸဵတ်း",
  "ပႅတ်ႇ",
  "ၵဝ်ႈ",
];

// format amount with currency
export const formatAmount = (amount: number, type: TransactionType): string => {
  const prefix = type === "income" ? "+ " : "- ";
  return `${prefix}$ ${amount.toFixed(2)}`;
};

// format date with i18next for transaction card
export const formatDate = (dateString: string, t?: any): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (!t) {
    // Fallback if t is not provided
    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays < 7) {
      return `${date.toLocaleDateString([], { weekday: "short" })}, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  }

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) {
    return `${t("date.today")}, ${time}`;
  } else if (diffDays === 1) {
    return `${t("date.yesterday")}, ${time}`;
  } else if (diffDays < 7) {
    const dayIndex = date.getDay();
    const days = t("date.days", { returnObjects: true });
    // Handle both array and object returns if i18next configuration differs, or just assume array as defined in JSON
    const dayName = Array.isArray(days) ? days[dayIndex] : days;
    return `${dayName}, ${time}`;
  }
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// format header date for home screen
export const formatHeaderDate = (date: Date, t: any): string => {
  const dayIndex = date.getDay();
  const days = t("date.days", { returnObjects: true });
  const dayName = Array.isArray(days) ? days[dayIndex] : days;

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

// get greeting time for home screen
export const getGreetingTime = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "morning";
  } else if (currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
};

// get currency symbol from currency code
export const getCurrencySymbol = (currency: string): string => {
  const currencySymbol = CURRENCIES.find((c) => c.code === currency);
  return currencySymbol?.symbol as string;
};

// format currency with currency symbol
export const formatCurrency = (amount: number, currency: string): string => {
  const currencySymbol = getCurrencySymbol(currency) || "$";
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

  return `${currencySymbol} ${formattedNumber}`;
};

// convert number to shan words
const shanWords = (n: number): string => {
  if (n === 0) return SHAN_DIGITS[0];

  let words = "";
  const digits = n.toString().split("").map(Number);
  const len = digits.length;

  digits.forEach((digit, index) => {
    const position = len - index - 1;
    if (digit !== 0) {
      if (digit === 1 && position === 1) {
        // Omit "ၼိုင်ႈ" (one) before "သိပ်း" (ten)
        words += SHAN_UNITS[position];
      } else {
        words += SHAN_DIGITS[digit] + SHAN_UNITS[position];
      }
    }
  });

  return words;
};

// convert number to words
export const convertWord = (amount: number, lang: string = "en") => {
  if (!amount) return "";
  if (lang === "shn") {
    return shanWords(amount);
  }
  return converter.toWords(amount);
};

// format join date for setting screen
export const formatJoinDate = (date: Date, t: any): string => {
  const dayIndex = date.getDay();
  const days = t("date.days", { returnObjects: true });
  const dayName = Array.isArray(days) ? days[dayIndex] : days;

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};
