import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect } from "react";

type EffectType = "move" | "win" | "draw" | "button";
type IntensityType = "light" | "medium" | "heavy";

export const useGameEffects = () => {
  // Initialize audio
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false
    });
  }, []);

  const playEffect = useCallback(
    async (effect: EffectType, intensity: IntensityType) => {
      try {
        // Get settings
        const settings = await AsyncStorage.getItem("gameSettings");
        const { soundEnabled = true, vibrationEnabled = true } = settings
          ? JSON.parse(settings)
          : {};

        // Play haptic feedback if enabled
        if (vibrationEnabled) {
          switch (intensity) {
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
        }

        // Play sound if enabled
        if (soundEnabled) {
          const sound = new Audio.Sound();
          try {
            // Load the appropriate sound based on effect type
            switch (effect) {
              case "move":
                await sound.loadAsync(require("../../assets/sounds/move.mp3"));
                break;
              case "win":
                await sound.loadAsync(require("../../assets/sounds/win.mp3"));
                break;
              case "draw":
                await sound.loadAsync(require("../../assets/sounds/draw.mp3"));
                break;
              case "button":
                await sound.loadAsync(
                  require("../../assets/sounds/button.mp3")
                );
                break;
            }

            await sound.playAsync();

            // Unload sound after playing
            sound.setOnPlaybackStatusUpdate(async (status) => {
              if (status.didJustFinish) {
                await sound.unloadAsync();
              }
            });
          } catch (error) {
            console.error("Error playing sound:", error);
            await sound.unloadAsync();
          }
        }
      } catch (error) {
        console.error("Error playing effect:", error);
      }
    },
    []
  );

  return { playEffect };
};
