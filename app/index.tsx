// app/index.tsx
import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "./components/themed/Button";
import { Text } from "./components/themed/Text";

export default function MenuScreen() {
  const [selectedSymbol, setSelectedSymbol] = useState<"X" | "O">("X");

  const handleSymbolSelect = (symbol: "X" | "O") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSymbol(symbol);
  };

  const handleStartGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/game");
  };

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Tic Tac Toe",
          headerShown: false
        }}
      />

      <Text style={styles.title}>Tic Tac Toe</Text>

      <View style={styles.symbolSelector}>
        <Text style={styles.symbolTitle}>Choose your Symbol</Text>
        <View style={styles.symbolButtons}>
          <TouchableOpacity
            style={[
              styles.symbolButton,
              selectedSymbol === "X" && styles.selectedSymbol
            ]}
            onPress={() => handleSymbolSelect("X")}
          >
            <Text style={styles.symbolText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.symbolButton,
              selectedSymbol === "O" && styles.selectedSymbol
            ]}
            onPress={() => handleSymbolSelect("O")}
          >
            <Text style={styles.symbolText}>O</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Start Game"
        onPress={handleStartGame}
        style={styles.startButton}
      />

      <Button
        title="Settings"
        onPress={handleSettings}
        style={styles.settingsButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 50
  },
  symbolSelector: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 30
  },
  symbolTitle: {
    fontSize: 24,
    marginBottom: 20
  },
  symbolButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  symbolButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10
  },
  selectedSymbol: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50"
  },
  symbolText: {
    fontSize: 36,
    fontWeight: "bold"
  },
  startButton: {
    backgroundColor: "#4CAF50",
    marginBottom: 10
  },
  settingsButton: {
    backgroundColor: "#2196F3"
  }
});
