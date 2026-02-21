import { Transaction, TransactionType } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";

export interface CreateTransactionParams {
  title: string;
  type: TransactionType;
  amount: number;
  category: string;
  transactionDate: string;
  note?: string;
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
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
}

// Get transaction summary (total income and expense)
export const getTransactionSummary = async (
  db: SQLiteDatabase,
): Promise<TransactionSummary> => {
  try {
    const result = await db.getFirstAsync<{
      totalIncome: number;
      totalExpense: number;
    }>(`
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as totalIncome,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as totalExpense
      FROM transactions
    `);

    return {
      totalIncome: result?.totalIncome || 0,
      totalExpense: result?.totalExpense || 0,
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

// Delete transaction
export const deleteTransaction = async (
  db: SQLiteDatabase,
  id: string,
): Promise<void> => {
  try {
    await db.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
