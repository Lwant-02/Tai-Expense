import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { FilterType } from "@/type";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface ExpenseChartProps {
  chartData: { value: number; label: string }[];
  activeFilter: FilterType;
}

export default function ExpenseChart({
  chartData,
  activeFilter,
}: ExpenseChartProps) {
  const { t } = useTranslation("statistic");

  const chartWidth = SCREEN_WIDTH - 40;
  const spacing = Math.floor(
    (chartWidth - 30) / Math.max(chartData.length - 1, 1),
  );

  const chartColor = activeFilter === "expense" ? "#2563EB" : "#22C55E";
  const chartFillStart =
    activeFilter === "expense"
      ? "rgba(37, 99, 235, 0.3)"
      : "rgba(34, 197, 94, 0.3)";
  const chartFillEnd =
    activeFilter === "expense"
      ? "rgba(37, 99, 235, 0.01)"
      : "rgba(34, 197, 94, 0.01)";

  const maxValue = Math.max(...chartData.map((d) => d.value));
  const isAllZero = maxValue === 0;

  const chartDataWithLabels = chartData.map((point) => ({
    ...point,
    dataPointColor: point.value === maxValue ? chartColor : "transparent",
    dataPointRadius: point.value === maxValue ? 6 : 0,
    customDataPoint:
      point.value === maxValue
        ? () => (
            <View className="items-center">
              <View
                style={{ backgroundColor: chartColor }}
                className="w-3 h-3 rounded-full border-2 border-primary"
              />
            </View>
          )
        : undefined,
    dataPointLabelComponent:
      point.value === maxValue
        ? () => {
            const label =
              activeFilter === "expense" ? t("most_expense") : t("most_income");
            return (
              <View className="items-center" style={{ marginLeft: -40 }}>
                <View className="bg-foreground rounded-xl px-3 min-w-[100px] py-1.5 border border-primary/10 items-center mb-1">
                  <Text className="text-primary font-GHKTachileik text-base font-semibold">
                    {"$" + point.value.toLocaleString()}
                  </Text>
                </View>
                <Text className="text-primary/80 font-GHKTachileik text-sm">
                  {label}
                </Text>
              </View>
            );
          }
        : undefined,
    dataPointLabelShiftY: point.value === maxValue ? 25 : 0,
    dataPointLabelShiftX: point.value === maxValue ? -5 : 0,
  }));

  if (isAllZero) {
    return (
      <View className="w-full mt-7 mb-2">
        <View className="h-[220px] justify-end px-5">
          <View className="flex-1 justify-center items-center">
            <Ionicons
              name="analytics-outline"
              size={48}
              color="rgba(255,255,255,0.15)"
            />
            <Text className="text-primary/30 font-GHKTachileik text-sm mt-2">
              {t("no_data")}
            </Text>
          </View>
          <View className="flex-row justify-between mt-2">
            {chartData.map((point, i) => (
              <Text
                key={i}
                className="text-primary/40 font-GHKTachileik text-sm"
              >
                {point.label}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="w-full mt-7 mb-2">
      <LineChart
        data={chartDataWithLabels}
        width={chartWidth}
        height={220}
        overflowTop={40}
        spacing={spacing}
        isAnimated={true}
        animationDuration={900}
        initialSpacing={20}
        endSpacing={10}
        thickness={3}
        color={chartColor}
        hideRules
        hideYAxisText
        yAxisColor="transparent"
        xAxisColor="transparent"
        xAxisLabelTextStyle={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 12,
          fontFamily: "GHKTachileik",
        }}
        curved
        areaChart
        startFillColor={chartFillStart}
        endFillColor={chartFillEnd}
        startOpacity={0.6}
        endOpacity={0.0}
        pointerConfig={{
          pointerStripColor: "rgba(255,255,255,0.15)",
          pointerStripWidth: 1,
          pointerColor: chartColor,
          radius: 6,
          pointerLabelWidth: 110,
          pointerLabelHeight: 50,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: any) => {
            return (
              <View
                style={{
                  backgroundColor: "#1c1c1c",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                  marginTop: 20,
                  width: 90,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontFamily: "GHKTachileik",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {"$" + (items[0]?.value?.toLocaleString() ?? "")}
                </Text>
              </View>
            );
          },
        }}
      />
    </View>
  );
}
