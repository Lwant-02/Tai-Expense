import {
  getSavings,
  getTransactionSummary,
  getTransactions,
  getUser,
} from "@/actions";
import { useSavingStore } from "@/store/saving.store";
import { useTransactionStore } from "@/store/transaction.store";
import { useUserStore } from "@/store/user.store";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation("common");
  const { setUser } = useUserStore();
  const db = useSQLiteContext();

  // State for user data and transaction data
  const { setSummary, setTransactions } = useTransactionStore();
  const { setSavings } = useSavingStore();

  // Fetch user data and transaction data
  useEffect(() => {
    const fetchUserData = async () => {
      const [user, summary, transactions, savings] = await Promise.all([
        getUser(db),
        getTransactionSummary(db),
        getTransactions(db), // Fetch all transactions for global state
        getSavings(db),
      ]);
      setUser(user);
      setSummary(summary);
      setTransactions(transactions);
      setSavings(savings);
    };
    fetchUserData();
  }, []);

  return (
    <NativeTabs
      backgroundColor="#000000"
      indicatorColor="#2563EB"
      iconColor={{
        default: "#8E8E93",
        selected: "#ffffff",
      }}
      labelStyle={{
        default: {
          fontFamily: "GHKTachileik",
          fontWeight: "500",
          fontSize: 10,
          color: "#8E8E93",
        },
        selected: {
          color: "#ffffff",
        },
      }}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>
          {t("navigation.home")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="statistic">
        <NativeTabs.Trigger.Label>
          {t("navigation.statistic")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.bar.xaxis" md="bar_chart" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="create">
        <NativeTabs.Trigger.Label>
          {t("navigation.create")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="plus.circle" md="add_circle" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="general">
        <NativeTabs.Trigger.Label>
          {t("navigation.general")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="square.3.layers.3d" md="layers" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="setting">
        <NativeTabs.Trigger.Label>
          {t("navigation.setting")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
