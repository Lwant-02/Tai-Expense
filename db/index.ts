import { SQLiteDatabase } from "expo-sqlite";
import {
  migrateToVersion1,
  migrateToVersion2,
  migrateToVersion3,
  migrateToVersion4,
  migrateToVersion5,
} from "./schema";

export const initDatabase = async (db: SQLiteDatabase) => {
  try {
    let response = await db.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version",
    );
    let currentDbVersion = response?.user_version ?? 0;

    // Target version is 5 to add the saving table
    const targetVersion = 5;

    console.log(
      `Initializing DB. Current version: ${currentDbVersion}, Target version: ${targetVersion}`,
    );

    if (currentDbVersion >= targetVersion) {
      return;
    }

    if (currentDbVersion === 0) {
      console.log("Applying Migration 1...");
      await migrateToVersion1(db);
      currentDbVersion = 1;
    }

    if (currentDbVersion === 1) {
      console.log("Applying Migration 2 (Adding createdAt to user)...");
      await migrateToVersion2(db);
      currentDbVersion = 2;
    }

    if (currentDbVersion === 2) {
      console.log(
        "Applying Migration 3 (Removing isIncome from transactions)...",
      );
      await migrateToVersion3(db);
      currentDbVersion = 3;
    }

    if (currentDbVersion === 3) {
      console.log("Applying Migration 4 (Adding title to transactions)...");
      await migrateToVersion4(db);
      currentDbVersion = 4;
    }

    if (currentDbVersion === 4) {
      console.log("Applying Migration 5 (Adding saving table)...");
      await migrateToVersion5(db);
      currentDbVersion = 5;
    }

    await db.execAsync(`PRAGMA user_version = ${targetVersion}`);
    console.log(`Database successfully migrated to version ${targetVersion}`);
  } catch (error) {
    console.error("Error migrating database:", error);
    throw error;
  }
};
