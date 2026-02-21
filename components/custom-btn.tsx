import { ButtonProps } from "@/type";
import cn from "clsx";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (bgVariant: ButtonProps["bgVariant"]) => {
  switch (bgVariant) {
    case "danger":
      return "bg-danger-500";
    case "outline":
      return "bg-transparent border-primary border-[0.5px]";
    case "success":
      return "bg-green-500";
    case "light":
      return "bg-white";
    case "dark":
      return "bg-background";
    case "blue":
      return "bg-blue";
    case "green":
      return "bg-green";
    default:
      return "bg-primary";
  }
};

const getTextVariantStyle = (textVariant: ButtonProps["textVariant"]) => {
  switch (textVariant) {
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    case "light":
      return "text-primary";
    case "dark":
      return "text-foreground";
    default:
      return "text-foreground";
  }
};

export default function CustomBtn({
  onPress,
  title,
  bgVariant,
  textVariant,
  IconLeft,
  IconRight,
  className,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "w-full rounded-full flex-row justify-center p-3  items-center shadow-md shadow-primary/20",
        getBgVariantStyle(bgVariant),
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#2563EB" className="size-7" />
      ) : (
        <>
          {IconLeft && IconLeft}
          <Text
            className={cn(
              "text-lg font-semibold font-GHKKengtung",
              getTextVariantStyle(textVariant),
            )}
          >
            {title}
          </Text>
          {IconRight && IconRight}
        </>
      )}
    </TouchableOpacity>
  );
}
