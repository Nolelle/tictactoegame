import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const triggerHaptic = async (style: "light" | "medium" | "heavy") => {
  if (Platform.OS !== "web") {
    try {
      switch (style) {
        case "light":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "heavy":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
      }
    } catch (error) {
      console.warn("Haptics not supported:", error);
    }
  }
};
