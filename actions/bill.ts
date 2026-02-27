import { Bill } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";

// Get all bills ordered by due date
export const getBills = async (db: SQLiteDatabase): Promise<Bill[]> => {
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM bills ORDER BY datetime(dueDate) ASC;`,
    );
    // SQLite stores booleans as 0 or 1, we must convert back for UI
    return result.map((row: any) => ({
      ...row,
      remindMe: Boolean(row.remindMe),
      isRecurring: Boolean(row.isRecurring),
    })) as Bill[];
  } catch (error) {
    console.error("Error getting bills:", error);
    throw error;
  }
};

// Insert a new bill
export const createBill = async (
  db: SQLiteDatabase,
  title: string,
  amount: number,
  dueDate: string,
  remindMe: boolean,
  isRecurring: boolean,
): Promise<void> => {
  try {
    await db.runAsync(
      `INSERT INTO bills (title, amount, dueDate, remindMe, isRecurring) VALUES (?, ?, ?, ?, ?);`,
      [title, amount, dueDate, remindMe ? 1 : 0, isRecurring ? 1 : 0],
    );
  } catch (error) {
    console.error("Error creating bill:", error);
    throw error;
  }
};

// Toggle the reminder flag
export const updateBillReminder = async (
  db: SQLiteDatabase,
  id: string,
  remindMe: boolean,
): Promise<void> => {
  try {
    await db.runAsync(`UPDATE bills SET remindMe = ? WHERE id = ?;`, [
      remindMe ? 1 : 0,
      id,
    ]);
  } catch (error) {
    console.error("Error updating bill reminder:", error);
    throw error;
  }
};

// Toggle the recurring flag
export const updateBillRecurring = async (
  db: SQLiteDatabase,
  id: string,
  isRecurring: boolean,
): Promise<void> => {
  try {
    await db.runAsync(`UPDATE bills SET isRecurring = ? WHERE id = ?;`, [
      isRecurring ? 1 : 0,
      id,
    ]);
  } catch (error) {
    console.error("Error updating bill recurring:", error);
    throw error;
  }
};

// Delete a bill
export const deleteBill = async (
  db: SQLiteDatabase,
  id: string,
): Promise<void> => {
  try {
    await db.runAsync(`DELETE FROM bills WHERE id = ?;`, [id]);
  } catch (error) {
    console.error("Error deleting bill:", error);
    throw error;
  }
};
