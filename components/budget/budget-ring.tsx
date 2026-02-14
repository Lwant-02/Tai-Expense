import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface BudgetRingProps {
  totalBudget: number;
  totalSpent: number;
}

export default function BudgetRing({
  totalBudget,
  totalSpent,
}: BudgetRingProps) {
  const { t } = useTranslation("budget");

  const percentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const clampedPercent = Math.min(percentage, 100);

  // Ring config
  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // We show ~75% of the circle (270 degrees arc)
  const arcLength = circumference * 0.75;
  const filledLength = arcLength * (clampedPercent / 100);
  const emptyLength = arcLength - filledLength;

  // Color based on percentage
  const getColor = () => {
    if (percentage >= 80) return "#EF4444"; // red
    if (percentage >= 50) return "#F59E0B"; // amber
    return "#22C55E"; // green
  };

  const ringColor = getColor();

  return (
    <View className="items-center pt-2 pb-4">
      <View className="relative items-center justify-center">
        <Svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size}`}>
          {/* Background arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            rotation={135}
            origin={`${size / 2}, ${size / 2}`}
          />
          {/* Filled arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ringColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${filledLength} ${circumference - filledLength}`}
            rotation={135}
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        {/* Center text overlay */}
        <View className="absolute items-center" style={{ top: 30 }}>
          <Text
            className="font-GHKTachileik text-3xl font-semibold p-2 text-primary"
            style={{ letterSpacing: -1 }}
          >
            $ {totalBudget.toLocaleString()}
          </Text>
          <Text className="text-primary/40 font-GHKTachileik text-sm mt-1">
            {t("spent")} ${totalSpent.toLocaleString()} / $
            {totalBudget.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
