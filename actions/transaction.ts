import { Transaction, TransactionType } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";
import { checkAndTriggerBudgetWarning } from "@/utils/notification-helpers";

export interface CreateTransactionParams {
  title: string;
  type: TransactionType;
  amount: number;
  category: string;
  transactionDate: string;
  note?: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  pastIncome: number;
  pastExpense: number;
}

// Create transaction
export const createTransaction = async (
  db: SQLiteDatabase,
  params: CreateTransactionParams,
): Promise<void> => {
  try {
    const result = await db.runAsync(
      `INSERT INTO transactions (title, type, amount, category, transactionDate, note) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        params.title,
        params.type,
        params.amount,
        params.category,
        params.transactionDate,
        params.note || "",
      ],
    );
    console.log(
      "Transaction created successfully with ID:",
      result.lastInsertRowId,
    );
    if (params.type === "expense") {
      await checkAndTriggerBudgetWarning(db);
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

// Get transaction summary (total income and expense)
export const getTransactionSummary = async (
  db: SQLiteDatabase,
): Promise<TransactionSummary> => {
  try {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    let pastYear = now.getFullYear();
    let pastMonth = now.getMonth();
    if (pastMonth === 0) {
      pastMonth = 12;
      pastYear -= 1;
    }
    const previousMonth = `${pastYear}-${String(pastMonth).padStart(2, "0")}`;

    const result = await db.getFirstAsync<{
      totalIncome: number;
      totalExpense: number;
      pastIncome: number;
      pastExpense: number;
    }>(
      `
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' AND strftime('%Y-%m', transactionDate) = ? THEN amount ELSE 0 END), 0) as totalIncome,
        COALESCE(SUM(CASE WHEN type = 'expense' AND strftime('%Y-%m', transactionDate) = ? THEN amount ELSE 0 END), 0) as totalExpense,
        COALESCE(SUM(CASE WHEN type = 'income' AND strftime('%Y-%m', transactionDate) = ? THEN amount ELSE 0 END), 0) as pastIncome,
        COALESCE(SUM(CASE WHEN type = 'expense' AND strftime('%Y-%m', transactionDate) = ? THEN amount ELSE 0 END), 0) as pastExpense
      FROM transactions
      WHERE strftime('%Y-%m', transactionDate) IN (?, ?)
    `,
      [
        currentMonth,
        currentMonth,
        previousMonth,
        previousMonth,
        currentMonth,
        previousMonth,
      ],
    );

    return {
      totalIncome: result?.totalIncome || 0,
      totalExpense: result?.totalExpense || 0,
      pastIncome: result?.pastIncome || 0,
      pastExpense: result?.pastExpense || 0,
    };
  } catch (error) {
    console.error("Error getting transaction summary:", error);
    throw error;
  }
};

// Get all transactions ordered by date
export const getTransactions = async (
  db: SQLiteDatabase,
): Promise<Transaction[]> => {
  try {
    const query =
      "SELECT * FROM transactions ORDER BY datetime(transactionDate) DESC";
    const result = await db.getAllAsync(query);
    return result as Transaction[];
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
};

// Update transaction
export const updateTransaction = async (
  db: SQLiteDatabase,
  id: string,
  params: CreateTransactionParams,
): Promise<void> => {
  try {
    await db.runAsync(
      `UPDATE transactions SET title = ?, type = ?, amount = ?, category = ?, transactionDate = ?, note = ? WHERE id = ?;`,
      [
        params.title,
        params.type,
        params.amount,
        params.category,
        params.transactionDate,
        params.note || "",
        id,
      ],
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Delete all transactions
export const deleteAllTransactions = async (
  db: SQLiteDatabase,
): Promise<void> => {
  try {
    await db.runAsync("DELETE FROM transactions;");
  } catch (error) {
    console.error("Error deleting all transactions:", error);
    throw error;
  }
};
