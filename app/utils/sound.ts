// app/utils/sound.ts
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

export class SoundManager {
  private sounds: { [key: string]: Audio.Sound } = {};
  private initialized = false;
  private soundEnabled = true;
  private vibrationEnabled = true;

  async init() {
    if (this.initialized) return;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false
      });

      // Load all sound effects
      const moveSound = new Audio.Sound();
      const winSound = new Audio.Sound();
      const drawSound = new Audio.Sound();
      const buttonSound = new Audio.Sound();

      await Promise.all([
        moveSound.loadAsync(require("../../assets/sounds/move.mp3")),
        winSound.loadAsync(require("../../assets/sounds/win.mp3")),
        drawSound.loadAsync(require("../../assets/sounds/draw.mp3")),
        buttonSound.loadAsync(require("../../assets/sounds/button.mp3"))
      ]);

      this.sounds = {
        move: moveSound,
        win: winSound,
        draw: drawSound,
        button: buttonSound
      };

      this.initialized = true;
    } catch (error) {
      console.error("Error initializing sounds:", error);
    }
  }

  setEnabled(sound: boolean, vibration: boolean) {
    this.soundEnabled = sound;
    this.vibrationEnabled = vibration;
  }

  async playEffect(
    effect: "move" | "win" | "draw" | "button",
    intensity: "light" | "medium" | "heavy" = "light"
  ) {
    // Play sound if enabled
    if (this.soundEnabled && this.sounds[effect]) {
      try {
        const sound = this.sounds[effect];
        await sound.setPositionAsync(0);
        await sound.playAsync();
      } catch (error) {
        console.error(`Error playing ${effect} sound:`, error);
      }
    }

    // Trigger haptic feedback if enabled
    if (this.vibrationEnabled) {
      try {
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
      } catch (error) {
        console.error("Error playing haptic:", error);
      }
    }
  }

  async cleanup() {
    try {
      await Promise.all(
        Object.values(this.sounds).map((sound) => sound.unloadAsync())
      );
      this.sounds = {};
      this.initialized = false;
    } catch (error) {
      console.error("Error cleaning up sounds:", error);
    }
  }
}

export const soundManager = new SoundManager();

// app/hooks/useGameEffects.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { soundManager } from "../utils/sound";

export type GameSettings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
};

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  vibrationEnabled: true
};

export function useGameEffects() {
  useEffect(() => {
    const initEffects = async () => {
      // Load settings
      const savedSettings = await AsyncStorage.getItem("gameSettings");
      const settings: GameSettings = savedSettings
        ? JSON.parse(savedSettings)
        : DEFAULT_SETTINGS;

      // Initialize sound manager with settings
      await soundManager.init();
      soundManager.setEnabled(settings.soundEnabled, settings.vibrationEnabled);
    };

    initEffects();

    // Cleanup
    return () => {
      soundManager.cleanup();
    };
  }, []);

  const playEffect = useCallback(
    (
      effect: "move" | "win" | "draw" | "button",
      intensity: "light" | "medium" | "heavy" = "light"
    ) => {
      soundManager.playEffect(effect, intensity);
    },
    []
  );

  return { playEffect };
}
