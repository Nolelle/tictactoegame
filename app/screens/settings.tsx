import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/themed/Button";
import Switch from "../components/themed/Switch";
import Text from "../components/themed/Text";
import { useGameEffects } from "../hooks/useGameEffects";
import { soundManager } from "../utils/sound";

export default function SettingsScreen() {
  const [settings, setSettings] = React.useState({
    soundEnabled: true,
    vibrationEnabled: true
  });
  const { playEffect } = useGameEffects();

  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("gameSettings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        soundManager.setEnabled(
          parsedSettings.soundEnabled,
          parsedSettings.vibrationEnabled
        );
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async (newSettings: typeof settings) => {
    try {
      await AsyncStorage.setItem("gameSettings", JSON.stringify(newSettings));
      soundManager.setEnabled(
        newSettings.soundEnabled,
        newSettings.vibrationEnabled
      );
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const handleToggleSound = (value: boolean) => {
    const newSettings = { ...settings, soundEnabled: value };
    setSettings(newSettings);
    saveSettings(newSettings);
    if (settings.vibrationEnabled) {
      playEffect("button", "light");
    }
  };

  const handleToggleVibration = (value: boolean) => {
    const newSettings = { ...settings, vibrationEnabled: value };
    setSettings(newSettings);
    saveSettings(newSettings);
    if (value) {
      playEffect("button", "light");
    }
  };

  const handleBack = () => {
    playEffect("button", "light");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Settings",
          headerShown: true
        }}
      />

      <View style={styles.settingsGroup}>
        <Text
          style={styles.groupTitle}
          variant="header"
        >
          Game Settings
        </Text>

        <Switch
          label="Sound Effects"
          value={settings.soundEnabled}
          onValueChange={handleToggleSound}
        />

        <Switch
          label="Vibration"
          value={settings.vibrationEnabled}
          onValueChange={handleToggleVibration}
        />
      </View>

      <Button
        title="Back to Menu"
        onPress={handleBack}
        style={styles.backButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20
  },
  settingsGroup: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  groupTitle: {
    marginBottom: 16
  },
  backButton: {
    marginTop: 20
  }
});
