import { User } from "@/type";
import { SQLiteDatabase } from "expo-sqlite";

export interface CreateUserParams {
  name: string;
  currency: string;
  startingBalance: number;
}

// Create user
export const createUser = async (
  db: SQLiteDatabase,
  params: CreateUserParams,
): Promise<void> => {
  try {
    const result = await db.runAsync(
      `INSERT INTO user (name, currency, startingBalance) VALUES (?, ?, ?);`,
      [params.name, params.currency, params.startingBalance],
    );
    console.log("User created successfully with ID:", result.lastInsertRowId);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Get user
export const getUser = async (db: SQLiteDatabase): Promise<User | null> => {
  try {
    const result = await db.getFirstAsync("SELECT * FROM user");
    return result as User;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Update user starting balance
export const updateUserBalance = async (
  db: SQLiteDatabase,
  userId: number,
  newBalance: number,
): Promise<void> => {
  try {
    await db.runAsync("UPDATE user SET startingBalance = ? WHERE id = ?", [
      newBalance,
      userId,
    ]);
  } catch (error) {
    console.error("Error updating user balance:", error);
    throw error;
  }
};

//Update user currency
export const updateUserCurrency = async (
  db: SQLiteDatabase,
  userId: number,
  newCurrency: string,
): Promise<void> => {
  try {
    await db.runAsync("UPDATE user SET currency = ? WHERE id = ?", [
      newCurrency,
      userId,
    ]);
  } catch (error) {
    console.error("Error updating user currency:", error);
    throw error;
  }
};

// Delete user for development only
export const deleteUser = async (db: SQLiteDatabase): Promise<void> => {
  try {
    await db.runAsync("DELETE FROM user");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
