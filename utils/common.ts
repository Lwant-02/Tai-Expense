import { TransactionType } from "@/type";

export const formatAmount = (amount: number, type: TransactionType): string => {
  const prefix = type === "income" ? "+ " : "- ";
  return `${prefix}$ ${amount.toFixed(2)}`;
};

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
