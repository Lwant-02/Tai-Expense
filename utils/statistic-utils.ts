import { CATEGORY_CONFIG } from "@/constants";
import { Transaction, TransactionCategory } from "@/type";

// ── Monthly Summary ────────────────────────────────────────────────────

export interface MonthlySummary {
  totalIncome: number;
  totalExpense: number;
  net: number;
  count: number;
}

export const getMonthlySummary = (
  transactions: Transaction[],
): MonthlySummary => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthTransactions = transactions.filter((t) => {
    const d = new Date(t.transactionDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    count: monthTransactions.length,
  };
};

// ── Monthly Daily Trend (for line chart) ───────────────────────────────

export const getMonthlyDailyTrend = (
  transactions: Transaction[],
  type: "income" | "expense" = "expense",
): { value: number; label: string }[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const today = now.getDate();

  // Build daily totals for each day up to today
  const dailyTotals = new Map<number, number>();

  transactions
    .filter((t) => {
      const d = new Date(t.transactionDate);
      return (
        t.type === type &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .forEach((t) => {
      const day = new Date(t.transactionDate).getDate();
      dailyTotals.set(day, (dailyTotals.get(day) || 0) + t.amount);
    });

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthLabel = shortMonths[currentMonth];

  // Only label 3 points: first day (with month name), middle, and today
  const mid = Math.round(today / 2);
  const monthName = shortMonths[currentMonth];

  const result: { value: number; label: string }[] = [];
  for (let day = 1; day <= today; day++) {
    let label = "";
    if (day === 1) label = `${monthName} 1`;
    else if (day === mid && today > 4) label = `${monthName} ${mid}`;
    else if (day === today && today > 2) label = `${monthName} ${today}`;
    result.push({
      value: dailyTotals.get(day) || 0,
      label,
    });
  }

  return result;
};

// ── Category Breakdown ─────────────────────────────────────────────────

export interface CategorySlice {
  category: TransactionCategory;
  amount: number;
  color: string;
  percentage: number;
}

export const getCategoryBreakdown = (
  transactions: Transaction[],
  type: "income" | "expense",
): CategorySlice[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const filtered = transactions.filter((t) => {
    const d = new Date(t.transactionDate);
    return (
      t.type === type &&
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  });

  const categoryMap = new Map<TransactionCategory, number>();
  filtered.forEach((t) => {
    const current = categoryMap.get(t.category as TransactionCategory) || 0;
    categoryMap.set(t.category as TransactionCategory, current + t.amount);
  });

  const total = filtered.reduce((sum, t) => sum + t.amount, 0);

  const slices: CategorySlice[] = [];
  categoryMap.forEach((amount, category) => {
    const config = CATEGORY_CONFIG[category];
    slices.push({
      category,
      amount,
      color: config?.color || "#8E8E93",
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    });
  });

  // Sort descending by amount
  slices.sort((a, b) => b.amount - a.amount);

  const MAX_SLICES = 5;
  if (slices.length <= MAX_SLICES) return slices;

  // Keep top 5, group the rest into "Other"
  const top = slices.slice(0, MAX_SLICES);
  const otherAmount = slices
    .slice(MAX_SLICES)
    .reduce((sum, s) => sum + s.amount, 0);

  top.push({
    category: "other" as TransactionCategory,
    amount: otherAmount,
    color: "#8E8E93",
    percentage: total > 0 ? Math.round((otherAmount / total) * 100) : 0,
  });

  return top;
};

// ── Weekly Trend ───────────────────────────────────────────────────────

export const getWeeklyTrend = (
  transactions: Transaction[],
  type: "income" | "expense",
): { value: number; label: string }[] => {
  const now = new Date();

  // Calculate Monday 00:00:00 of this week (local time)
  const jsDay = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const daysFromMonday = jsDay === 0 ? 6 : jsDay - 1;

  const monday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysFromMonday,
    0,
    0,
    0,
    0,
  );

  // Sunday 23:59:59 of this week
  const sunday = new Date(
    monday.getFullYear(),
    monday.getMonth(),
    monday.getDate() + 6,
    23,
    59,
    59,
    999,
  );

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dailyTotals = new Array(7).fill(0);

  transactions
    .filter((t) => t.type === type)
    .forEach((t) => {
      const d = new Date(t.transactionDate);
      // Only include transactions within this week
      if (d >= monday && d <= sunday) {
        // Map JS getDay() (Sun=0, Mon=1...Sat=6) → Mon=0, Tue=1...Sun=6
        const txDay = d.getDay();
        const idx = txDay === 0 ? 6 : txDay - 1;
        dailyTotals[idx] += t.amount;
      }
    });

  return labels.map((label, i) => ({
    value: dailyTotals[i],
    label,
  }));
};

// ── Monthly Comparison (Last 6 Months) ─────────────────────────────────

export interface MonthlyComparison {
  month: string;
  income: number;
  expense: number;
}

export const getMonthlyComparison = (
  transactions: Transaction[],
): MonthlyComparison[] => {
  const now = new Date();
  const months: MonthlyComparison[] = [];

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthIdx = d.getMonth();
    const year = d.getFullYear();

    const monthTransactions = transactions.filter((t) => {
      const td = new Date(t.transactionDate);
      return td.getMonth() === monthIdx && td.getFullYear() === year;
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    months.push({
      month: shortMonths[monthIdx],
      income,
      expense,
    });
  }

  return months;
};
