import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";
import Button from "../components/themed/Button";
import Text from "../components/themed/Text";
import { useGameEffects } from "../hooks/useGameEffects";
import { checkGameStatus } from "../utils/gameLogic";
import { triggerHaptic } from "../utils/haptics";

export default function GameScreen() {
  const { startingPlayer } = useLocalSearchParams<{
    startingPlayer: "X" | "O";
  }>();
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    startingPlayer || "X"
  );
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const { playEffect } = useGameEffects();
  const [settings] = useState({ vibrationEnabled: true });

  // Load saved scores when component mounts
  useEffect(() => {
    const loadSavedScores = async () => {
      try {
        const savedScores = await AsyncStorage.getItem("scores");
        if (savedScores) {
          setScores(JSON.parse(savedScores));
        }
      } catch (error) {
        console.error("Error loading scores:", error);
      }
    };
    loadSavedScores();
  }, []);

  // Save scores whenever they change
  useEffect(() => {
    const saveScores = async () => {
      try {
        await AsyncStorage.setItem("scores", JSON.stringify(scores));
      } catch (error) {
        console.error("Error saving scores:", error);
      }
    };
    saveScores();
  }, [scores]);

  const handleCellPress = async (index: number) => {
    if (board[index] === "") {
      playEffect("move", "light");

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const gameStatus = checkGameStatus(newBoard);
      console.log("Game Status:", gameStatus); // Debug output

      if (gameStatus.status === "win") {
        // Update scores immediately when there's a winner
        setScores((prevScores) => ({
          ...prevScores,
          [currentPlayer]: prevScores[currentPlayer] + 1
        }));
        playEffect("win", "heavy");
        router.push({
          pathname: "/screens/game-over",
          params: { result: currentPlayer }
        });
      } else if (gameStatus.status === "draw") {
        playEffect("draw", "medium");
        router.push({
          pathname: "/screens/game-over",
          params: { result: "draw" }
        });
      } else {
        setCurrentPlayer((current) => (current === "X" ? "O" : "X"));
      }
    }
  };

  const handleBack = async () => {
    playEffect("button", "light");
    // Clear game state and scores when going back
    await AsyncStorage.removeItem("gameState");
    await AsyncStorage.removeItem("scores");
    // Reset local scores state
    setScores({ X: 0, O: 0 });
    router.replace("/");
  };

  const resetGame = async () => {
    playEffect("button", "medium");
    setBoard(Array(9).fill(""));
    setCurrentPlayer(startingPlayer || "X"); // Reset to starting player
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <StatusBar style="auto" />

      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <Button
            title="Back"
            onPress={handleBack}
            style={styles.backButton}
          />
        </View>
        <View style={styles.turnIndicatorContainer}>
          <Text style={styles.turnIndicator}>
            Player {currentPlayer}'s Turn
          </Text>
        </View>
      </View>

      <GameBoard
        board={board}
        onCellPress={handleCellPress}
        currentPlayer={currentPlayer}
        settings={settings}
      />

      <ScoreBoard scores={scores} />

      <Button
        title="Reset Game"
        onPress={resetGame}
        style={styles.resetButton}
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
    padding: 20,
    paddingTop: 40
  },
  header: {
    width: "100%",
    marginBottom: 20,
    marginTop: 20
  },
  backButtonContainer: {
    width: "100%",
    marginBottom: 15
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#666",
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 3
  },
  turnIndicatorContainer: {
    width: "100%",
    alignItems: "center"
  },
  turnIndicator: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#ff6b6b"
  }
});
