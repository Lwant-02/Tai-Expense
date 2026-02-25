import { SavingGoal } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";

export interface CreateSavingParams {
  title: string;
  targetAmount: number;
  color: string;
  icon: string;
}

export interface UpdateSavingParams {
  title: string;
  targetAmount: number;
  color: string;
  icon: string;
}

// Create saving
export const createSaving = async (
  db: SQLiteDatabase,
  params: CreateSavingParams,
): Promise<void> => {
  try {
    const result = await db.runAsync(
      `INSERT INTO saving (title, targetAmount, currentAmount, color, icon) VALUES (?, ?, ?, ?, ?);`,
      [params.title, params.targetAmount, 0, params.color, params.icon],
    );
    console.log("Saving created successfully with ID:", result.lastInsertRowId);
  } catch (error) {
    console.error("Error creating saving:", error);
    throw error;
  }
};

// Get all savings
export const getSavings = async (db: SQLiteDatabase): Promise<SavingGoal[]> => {
  try {
    const query = "SELECT * FROM saving ORDER BY datetime(createdAt) DESC";
    const result = await db.getAllAsync(query);
    return result as SavingGoal[];
  } catch (error) {
    console.error("Error getting savings:", error);
    throw error;
  }
};

// Update saving
export const updateSaving = async (
  db: SQLiteDatabase,
  id: string,
  params: UpdateSavingParams,
): Promise<void> => {
  try {
    await db.runAsync(
      `UPDATE saving SET title = ?, targetAmount = ?, color = ?, icon = ? WHERE id = ?;`,
      [params.title, params.targetAmount, params.color, params.icon, id],
    );
    console.log("Saving updated successfully");
  } catch (error) {
    console.error("Error updating saving:", error);
    throw error;
  }
};

// Update saving current amount
export const updateSavingCurrentAmount = async (
  db: SQLiteDatabase,
  id: string,
  amountToAdd: number,
): Promise<void> => {
  try {
    await db.runAsync(
      `UPDATE saving SET currentAmount = currentAmount + ? WHERE id = ?;`,
      [amountToAdd, id],
    );
    console.log("Saving current amount updated successfully");
  } catch (error) {
    console.error("Error updating saving current amount:", error);
    throw error;
  }
};

// Delete saving
export const deleteSaving = async (
  db: SQLiteDatabase,
  id: string,
): Promise<void> => {
  try {
    await db.runAsync("DELETE FROM saving WHERE id = ?;", [id]);
    console.log("Saving deleted successfully");
  } catch (error) {
    console.error("Error deleting saving:", error);
    throw error;
  }
};
