import React from "react";
import { ScrollView, View } from "react-native";
import UpcomingBills from "./upcoming-bills";

export default function BudgetView() {
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        <UpcomingBills />
      </ScrollView>
    </View>
  );
}
