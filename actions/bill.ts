import { Bill } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";
import { scheduleBillDueReminder, cancelNotification } from "@/notification/scheduler";
import { NotificationId } from "@/notification/types";

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
    const result = await db.runAsync(
      `INSERT INTO bills (title, amount, dueDate, remindMe, isRecurring) VALUES (?, ?, ?, ?, ?);`,
      [title, amount, dueDate, remindMe ? 1 : 0, isRecurring ? 1 : 0],
    );
    if (remindMe) {
      await scheduleBillDueReminder(
        result.lastInsertRowId.toString(),
        title,
        new Date(dueDate),
        isRecurring
      );
    }
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
    if (remindMe) {
      const result = await db.getFirstAsync<{ title: string, dueDate: string, isRecurring: number }>(
        `SELECT title, dueDate, isRecurring FROM bills WHERE id = ?;`, [id]
      );
      if (result) {
        await scheduleBillDueReminder(id, result.title, new Date(result.dueDate), Boolean(result.isRecurring));
      }
    } else {
      await cancelNotification(`bill-due-reminder-${id}` as NotificationId);
    }
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
    const result = await db.getFirstAsync<{ title: string, dueDate: string, remindMe: number }>(
      `SELECT title, dueDate, remindMe FROM bills WHERE id = ?;`, [id]
    );
    if (result && result.remindMe) {
      await scheduleBillDueReminder(id, result.title, new Date(result.dueDate), isRecurring);
    }
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
    await cancelNotification(`bill-due-reminder-${id}` as NotificationId);
  } catch (error) {
    console.error("Error deleting bill:", error);
    throw error;
  }
};

// Check and auto-rollover recurring bills
export const autoRolloverRecurringBills = async (db: SQLiteDatabase): Promise<boolean> => {
  try {
    const allBills = await getBills(db);
    const now = new Date();
    
    // Set 'now' to start of day to avoid premature rollovers
    now.setHours(0, 0, 0, 0);

    let updatedAny = false;

    for (const bill of allBills) {
      if (bill.isRecurring) {
        const dueDate = new Date(bill.dueDate);
        
        // If the bill's due date is stricly in the past
        if (dueDate.getTime() < now.getTime()) {
          // Advance it by one month
          dueDate.setMonth(dueDate.getMonth() + 1);
          
          await db.runAsync(`UPDATE bills SET dueDate = ? WHERE id = ?;`, [
            dueDate.toISOString(),
            bill.id,
          ]);

          // Re-schedule the notification for the new month if remindMe is on
          if (bill.remindMe) {
            await scheduleBillDueReminder(
              bill.id,
              bill.title,
              dueDate,
              true
            );
          }
          updatedAny = true;
        }
      }
    }
    
    return updatedAny;
  } catch (error) {
    console.error("Error rolling over recurring bills:", error);
    return false;
  }
};
