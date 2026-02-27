import { BudgetData, CategoryBudget } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";

// Set or update the monthly budget
export const setMonthlyBudget = async (
  db: SQLiteDatabase,
  amount: number,
  month: string, // format: 'YYYY-MM'
  year: string,
): Promise<void> => {
  try {
    // Check if budget already exists for this month/year
    const existingObj = await db.getFirstAsync<{ id: number }>(
      `SELECT id FROM budget WHERE month = ? AND year = ?;`,
      [month, year],
    );

    if (existingObj && existingObj.id) {
      await db.runAsync(`UPDATE budget SET amount = ? WHERE id = ?;`, [
        amount,
        existingObj.id,
      ]);
    } else {
      await db.runAsync(
        `INSERT INTO budget (amount, month, year) VALUES (?, ?, ?);`,
        [amount, month, year],
      );
    }
  } catch (error) {
    console.error("Error setting monthly budget:", error);
    throw error;
  }
};

// Get the budget data combined with transaction summaries for the month
export const getBudgetData = async (
  db: SQLiteDatabase,
  month: string, // format: 'YYYY-MM'
  year: string,
): Promise<BudgetData> => {
  try {
    // 1. Get Monthly Budget Amount
    const budgetObj = await db.getFirstAsync<{ amount: number }>(
      `SELECT amount FROM budget WHERE month = ? AND year = ?;`,
      [month, year],
    );
    const monthlyBudget = budgetObj ? budgetObj.amount : 0;

    // 2. Get Total Spent (expenses) for the month
    const totalObj = await db.getFirstAsync<{ totalSpent: number }>(
      `SELECT COALESCE(SUM(amount), 0) as totalSpent 
       FROM transactions 
       WHERE type = 'expense' AND strftime('%Y-%m', transactionDate) = ?;`,
      [month],
    );
    const totalSpent = totalObj?.totalSpent || 0;

    // 3. Get Spending broken down by Category
    const categoryQuery = `
      SELECT category, COALESCE(SUM(amount), 0) as spent
      FROM transactions
      WHERE type = 'expense' AND strftime('%Y-%m', transactionDate) = ?
      GROUP BY category
      ORDER BY spent DESC;
    `;
    const categoryRows = await db.getAllAsync(categoryQuery, [month]);

    const categoryBudgets: CategoryBudget[] = categoryRows.map((row: any) => ({
      category: row.category,
      spent: row.spent,
    }));

    return {
      monthlyBudget,
      totalSpent,
      categoryBudgets,
    };
  } catch (error) {
    console.error("Error getting budget data:", error);
    throw error;
  }
};
