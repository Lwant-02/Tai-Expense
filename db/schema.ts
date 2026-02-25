import { CATEGORIES, CURRENCIES } from "@/constants";

const categoryList = CATEGORIES.map((c) => `'${c}'`).join(", ");
const currencyList = CURRENCIES.map((c) => `'${c.code}'`).join(", ");

export const migrateToVersion1 = async (db: any) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    -- transactions
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('expense', 'income')) NOT NULL,
      amount REAL NOT NULL,
      category TEXT CHECK(category IN (${categoryList})) NOT NULL,
      transactionDate TEXT NOT NULL,
      note TEXT
    );

    -- bills
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      dueDate REAL NOT NULL,
      remindMe BOOLEAN NOT NULL,
      isRecurring BOOLEAN NOT NULL
    );

    -- user
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      startingBalance REAL NOT NULL,
      currency TEXT CHECK(currency IN (${currencyList})) NOT NULL,
      createdAt TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL
    );

    -- budget
    CREATE TABLE IF NOT EXISTS budget (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      month TEXT NOT NULL,
      year TEXT NOT NULL
    );
  `);
};

export const migrateToVersion2 = async (db: any) => {
  await db.execAsync(`
    DROP TABLE IF EXISTS user;

    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      startingBalance REAL NOT NULL,
      currency TEXT CHECK(currency IN (${currencyList})) NOT NULL,
      createdAt TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL
    );
  `);
};

export const migrateToVersion3 = async (db: any) => {
  await db.execAsync(`
    DROP TABLE IF EXISTS transactions;

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('expense', 'income')) NOT NULL,
      amount REAL NOT NULL,
      category TEXT CHECK(category IN (${categoryList})) NOT NULL,
      transactionDate TEXT NOT NULL,
      note TEXT
    );
  `);
};

export const migrateToVersion4 = async (db: any) => {
  await db.execAsync(`
    DROP TABLE IF EXISTS transactions;

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT CHECK(type IN ('expense', 'income')) NOT NULL,
      amount REAL NOT NULL,
      category TEXT CHECK(category IN (${categoryList})) NOT NULL,
      transactionDate TEXT NOT NULL,
      note TEXT
    );
  `);
};

export const migrateToVersion5 = async (db: any) => {
  await db.execAsync(`
    DROP TABLE IF EXISTS saving;

    CREATE TABLE IF NOT EXISTS saving (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      targetAmount REAL NOT NULL,
      currentAmount REAL DEFAULT 0,
      color TEXT NOT NULL,
      icon TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL
    );
  `);
};
