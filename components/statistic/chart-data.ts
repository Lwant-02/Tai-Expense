import { Transaction } from "@/type";

// ── Chart data per period × filter ──────────────────────────────────────

export const SAMPLE_CHART_DATA = {
  expense: {
    week: [
      { value: 120, label: "Mon" },
      { value: 250, label: "Tue" },
      { value: 180, label: "Wed" },
      { value: 310, label: "Thu" },
      { value: 90, label: "Fri" },
      { value: 420, label: "Sat" },
      { value: 200, label: "Sun" },
    ],
    month: [
      { value: 400, label: "Mar" },
      { value: 600, label: "Apr" },
      { value: 1230, label: "May" },
      { value: 980, label: "Jun" },
      { value: 1100, label: "Jul" },
      { value: 850, label: "Aug" },
      { value: 750, label: "Sep" },
    ],
    year: [
      { value: 4200, label: "2020" },
      { value: 5800, label: "2021" },
      { value: 7300, label: "2022" },
      { value: 6100, label: "2023" },
      { value: 8500, label: "2024" },
      { value: 3200, label: "2025" },
    ],
  },
  income: {
    week: [
      { value: 0, label: "Mon" },
      { value: 350, label: "Tue" },
      { value: 0, label: "Wed" },
      { value: 0, label: "Thu" },
      { value: 1200, label: "Fri" },
      { value: 0, label: "Sat" },
      { value: 80, label: "Sun" },
    ],
    month: [
      { value: 2500, label: "Mar" },
      { value: 2800, label: "Apr" },
      { value: 3200, label: "May" },
      { value: 2700, label: "Jun" },
      { value: 3500, label: "Jul" },
      { value: 2900, label: "Aug" },
      { value: 3100, label: "Sep" },
    ],
    year: [
      { value: 18000, label: "2020" },
      { value: 22000, label: "2021" },
      { value: 28000, label: "2022" },
      { value: 32000, label: "2023" },
      { value: 35000, label: "2024" },
      { value: 15000, label: "2025" },
    ],
  },
};

export const EMPTY_CHART_DATA = {
  expense: {
    week: [
      { value: 0, label: "Mon" },
      { value: 0, label: "Tue" },
      { value: 0, label: "Wed" },
      { value: 0, label: "Thu" },
      { value: 0, label: "Fri" },
      { value: 0, label: "Sat" },
      { value: 0, label: "Sun" },
    ],
    month: [
      { value: 0, label: "Mar" },
      { value: 0, label: "Apr" },
      { value: 0, label: "May" },
      { value: 0, label: "Jun" },
      { value: 0, label: "Jul" },
      { value: 0, label: "Aug" },
      { value: 0, label: "Sep" },
    ],
    year: [
      { value: 0, label: "2020" },
      { value: 0, label: "2021" },
      { value: 0, label: "2022" },
      { value: 0, label: "2023" },
      { value: 0, label: "2024" },
      { value: 0, label: "2025" },
    ],
  },
  income: {
    week: [
      { value: 0, label: "Mon" },
      { value: 0, label: "Tue" },
      { value: 0, label: "Wed" },
      { value: 0, label: "Thu" },
      { value: 0, label: "Fri" },
      { value: 0, label: "Sat" },
      { value: 0, label: "Sun" },
    ],
    month: [
      { value: 0, label: "Mar" },
      { value: 0, label: "Apr" },
      { value: 0, label: "May" },
      { value: 0, label: "Jun" },
      { value: 0, label: "Jul" },
      { value: 0, label: "Aug" },
      { value: 0, label: "Sep" },
    ],
    year: [
      { value: 0, label: "2020" },
      { value: 0, label: "2021" },
      { value: 0, label: "2022" },
      { value: 0, label: "2023" },
      { value: 0, label: "2024" },
      { value: 0, label: "2025" },
    ],
  },
};

// Change to SAMPLE_CHART_DATA to see test data
export const CHART_DATA = SAMPLE_CHART_DATA;

// ── Top transactions per filter ─────────────────────────────────────────

export const TOP_EXPENSE: Transaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 120.5,
    date: new Date().toISOString(),
    type: "expense",
    category: "food",
  },
  {
    id: "2",
    title: "Uber Ride",
    amount: 25.0,
    date: new Date().toISOString(),
    type: "expense",
    category: "transport",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: 15.99,
    date: new Date().toISOString(),
    type: "expense",
    category: "entertainment",
  },
];

export const TOP_INCOME: Transaction[] = [
  {
    id: "4",
    title: "Salary",
    amount: 5000.0,
    date: new Date().toISOString(),
    type: "income",
    category: "salary",
  },
  {
    id: "5",
    title: "Freelance Project",
    amount: 1200.0,
    date: new Date().toISOString(),
    type: "income",
    category: "freelance",
  },
  {
    id: "6",
    title: "Stock Dividend",
    amount: 150.0,
    date: new Date().toISOString(),
    type: "income",
    category: "investment",
  },
];
