import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { KeyboardAvoidingView } from "react-native";

interface CustomBottomSheetProps {
  sheetRef: React.Ref<BottomSheet>;
  children: React.ReactNode;
}

export default function CustomBottomSheet({
  sheetRef,
  children,
}: CustomBottomSheetProps) {
  const snapPoints = useMemo(() => ["90%", "95%"], []);
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enableDynamicSizing={false}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backgroundStyle={{ backgroundColor: "#1a1a1a" }}
      handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.3)" }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingBottom: 70,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
}
