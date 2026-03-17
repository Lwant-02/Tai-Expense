import { SQLiteDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBudgetData } from "@/actions/budget";
import { sendBudgetWarning, loadNotificationSettings } from "@/notification";

const BUDGET_WARNING_KEY_PREFIX = "budget_warning_sent_";

/**
 * Check if the total expenses exceed the notification threshold limit
 * set in settings, and fire a warning if it hasn't been fired this month.
 */
export async function checkAndTriggerBudgetWarning(db: SQLiteDatabase) {
  try {
    const settings = await loadNotificationSettings();

    if (!settings.budgetWarning.enabled) {
      return;
    }

    const now = new Date();
    const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const yearStr = now.getFullYear().toString();

    // Check if warning already sent for this month
    const warningKey = `${BUDGET_WARNING_KEY_PREFIX}${monthStr}`;
    const alreadySent = await AsyncStorage.getItem(warningKey);

    if (alreadySent === "true") {
      return; // Already warned the user this month, don't spam
    }

    // Get current progress
    const budgetData = await getBudgetData(db, monthStr, yearStr);
    
    // If no budget is set, or it's 0, we can't warn
    if (budgetData.monthlyBudget <= 0) {
      return;
    }

    const percentage = (budgetData.totalSpent / budgetData.monthlyBudget) * 100;
    const threshold = settings.budgetWarning.threshold;

    if (percentage >= threshold) {
      // Send warning immediately
      await sendBudgetWarning(Math.round(percentage));
      // Mark as sent for this month
      await AsyncStorage.setItem(warningKey, "true");
    }
  } catch (error) {
    console.error("Failed to check or trigger budget warning:", error);
  }
}
