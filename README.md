# 💰 Tai Expense (For Shan Community)

A personal expense tracker mobile app built with **Expo 55** and **React Native 0.83**. Track income & expenses, manage budgets, set saving goals, schedule bill reminders — all offline with a local SQLite database. Supports **English** and **Shan** languages.

---

## ✨ Features

- **Expense & Income Tracking** — Log transactions across 20 categories (food, transport, shopping, salary, freelance, etc.)
- **Budget Management** — Set monthly budgets and track spending per category with visual progress
- **Saving Goals** — Create goals with custom colors & icons, track progress toward targets
- **Bill Reminders** — Schedule due bills with optional recurring reminders
- **Statistics & Charts** — Visualize spending by week/month/year with interactive charts
- **Push Notifications** — Daily reminders, bill due alerts, weekly summaries, and budget warnings
- **Multi-Currency** — 8 currencies supported (USD, EUR, JPY, AUD, MMK, THB, SGD, CNY)
- **Bilingual (EN / Shan)** — Full i18n with 10 namespaces, including Shan number-to-words conversion
- **Onboarding Flow** — Guided welcome carousel + initial setup (name, currency, starting balance)
- **Offline-First** — All data stored locally in SQLite with versioned migrations
- **Native Tab Navigation** — 5-tab layout using Expo Router's `NativeTabs`
- **Haptic Feedback, Blur Effects & Glass UI** — Polished native experience

---

## 🛠 Tech Stack

| Category            | Technologies                                                    |
| ------------------- | --------------------------------------------------------------- |
| **Framework**       | Expo 55 (SDK), React Native 0.83, React 19                     |
| **Navigation**      | Expo Router (file-based), NativeTabs, React Navigation          |
| **Styling**         | NativeWind 4, Tailwind CSS 3, Tailwind Merge                   |
| **State**           | Zustand (5 stores: user, transaction, bill, budget, saving)     |
| **Database**        | expo-sqlite (SQLCipher, FTS, 5 migration versions)              |
| **Storage**         | AsyncStorage (onboarding, language, currency, username)         |
| **i18n**            | i18next + react-i18next (English & Shan)                        |
| **Notifications**   | expo-notifications (daily, bill due, weekly, budget warnings)   |
| **Charts**          | react-native-gifted-charts                                      |
| **UI Components**   | Bottom Sheet, Reanimated Carousel, Date/Time Picker             |
| **Animations**      | React Native Reanimated 4, Gesture Handler                      |
| **Other**           | expo-haptics, expo-blur, expo-linear-gradient, number-to-words  |

---

## 📁 Project Structure

```
Tai-Expense/
├── app/
│   ├── _layout.tsx                 # Root layout (SQLite, fonts, notifications)
│   ├── index.tsx                   # Entry redirect (onboarding → setup → home)
│   ├── global.css                  # NativeWind global styles
│   ├── (welcome)/
│   │   ├── welcome.tsx             # Onboarding carousel
│   │   └── get-started.tsx         # Initial account setup
│   └── (root)/
│       ├── (tabs)/
│       │   ├── _layout.tsx         # 5-tab NativeTabs layout
│       │   ├── home.tsx            # Dashboard (balance, transactions, savings)
│       │   ├── statistic.tsx       # Statistics & charts
│       │   ├── create.tsx          # Create new transaction
│       │   ├── general.tsx         # General overview
│       │   └── setting.tsx         # User settings
│       ├── all-transactions.tsx    # Full transaction history
│       ├── transaction-detail.tsx  # Transaction detail view
│       ├── all-budget.tsx          # All budgets
│       ├── budget.tsx              # Budget detail
│       ├── all-due-bill.tsx        # All due bills
│       ├── due-bill.tsx            # Bill detail
│       ├── all-saving-goal.tsx     # All saving goals
│       ├── saving-goal-detail.tsx  # Saving goal detail
│       ├── notification.tsx        # Notification settings
│       └── settings/              # Additional settings pages
├── components/
│   ├── custom-btn.tsx              # Reusable button (7 variants)
│   ├── custom-input.tsx            # Reusable input field
│   ├── custom-bottom-sheet.tsx     # Bottom sheet wrapper
│   ├── banner.tsx                  # Financial tips banner
│   ├── header.tsx                  # Screen header
│   ├── empty-state.tsx             # Empty state placeholder
│   ├── language-toggle.tsx         # EN/Shan language switcher
│   ├── home/                      # Home screen components
│   ├── statistic/                  # Chart & statistic components
│   ├── create/                    # Transaction creation components
│   ├── budget/                    # Budget components
│   └── settings/                  # Settings components
├── store/                         # Zustand state stores
│   ├── user.store.ts
│   ├── transaction.store.ts
│   ├── bill.store.ts
│   ├── budget.store.ts
│   └── saving.store.ts
├── db/
│   ├── index.ts                   # Database init & migration runner
│   └── schema.ts                  # SQL migrations (v1–v5)
├── actions/                       # Database CRUD operations
│   ├── user.ts
│   ├── transaction.ts
│   ├── bill.ts
│   ├── budget.ts
│   └── saving.ts
├── notification/                  # Push notification system
│   ├── scheduler.ts               # Schedule/cancel notifications
│   ├── manager.ts                 # Notification lifecycle management
│   ├── storage.ts                 # Persist notification settings
│   └── types.ts                   # Notification types & defaults
├── i18n/
│   └── index.ts                   # i18next configuration
├── locales/
│   ├── en/                        # English translations (10 files)
│   └── shn/                       # Shan translations (10 files)
├── constants/
│   └── index.ts                   # Categories, currencies, icons, banners
├── utils/
│   ├── common.ts                  # Date formatting, currency, number-to-words
│   ├── statistic-utils.ts         # Chart data calculations
│   └── storage.ts                 # AsyncStorage helpers
├── assets/
│   ├── fonts/                     # GHKKengtung, GHKTachileik (Shan fonts)
│   ├── icons/                     # App icons & splash screens
│   └── images/                    # Onboarding images
└── type.d.ts                      # Global TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Expo CLI** (`npx expo`)
- **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator)
- Physical device with [Expo Go](https://expo.dev/go) for quick testing

### Installation

```bash
# Clone the repository
git clone https://github.com/Lwant-02/Tai-Expense.git
cd Tai-Expense

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios
```

### Build (EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

---

## 📜 Available Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `npm start`          | Start Expo development server      |
| `npm run android`    | Run on Android emulator/device     |
| `npm run ios`        | Run on iOS simulator/device        |
| `npm run web`        | Start web version                  |
| `npm run lint`       | Run ESLint                         |

---

## 🗄 Database Schema

| Table            | Description                                    |
| ---------------- | ---------------------------------------------- |
| `user`           | User profile (name, currency, starting balance)|
| `transactions`   | Income & expense records with categories        |
| `bills`          | Scheduled bills with due dates & reminders      |
| `budget`         | Monthly budget amounts by month/year            |
| `saving`         | Saving goals with target & current amounts      |

The database uses **versioned migrations** (v1–v5) and runs on SQLite with WAL journaling mode.

---

## 🔔 Notification Types

| Type               | Trigger                              | Default       |
| ------------------ | ------------------------------------ | ------------- |
| Daily Reminder     | Repeats daily at set time            | 8:00 PM       |
| Bill Due Reminder  | 1 day before bill due date           | 9:00 AM       |
| Weekly Summary     | Repeats weekly on set day            | Sunday 10 AM  |
| Budget Warning     | Immediate when threshold exceeded    | 80%           |

---

## 🌐 Supported Languages

- 🇬🇧 **English**
- 🇲🇲 **Shan** (default) — includes custom Shan number-to-words converter and Shan fonts (GHKKengtung, GHKTachileik)

---

## 📄 License

This project is personal and not currently licensed for redistribution.

---

**Built with ❤️ by [Sai Naw Main (Lwant)](https://github.com/Lwant-02)**
