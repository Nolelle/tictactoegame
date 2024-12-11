import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";
import Button from "../components/themed/Button";
import Text from "../components/themed/Text";
import { useGameEffects } from "../hooks/useGameEffects";
import { checkWinner } from "../utils/gameLogic";
import { triggerHaptic } from "../utils/haptics";

export default function GameScreen() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const { playEffect } = useGameEffects();
  const [settings] = useState({ vibrationEnabled: true });

  // Load saved game state if exists
  useEffect(() => {
    const loadGameState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("gameState");
        if (savedState) {
          const { board, currentPlayer, scores } = JSON.parse(savedState);
          setBoard(board);
          setCurrentPlayer(currentPlayer);
          setScores(scores);
        }
      } catch (error) {
        console.error("Error loading game state:", error);
      }
    };
    loadGameState();
  }, []);

  const handleCellPress = (index: number) => {
    if (board[index] === "") {
      playEffect("move", "light");

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        if (winner === "draw") {
          playEffect("draw", "medium");
        } else {
          playEffect("win", "heavy");
          setScores((prev) => ({
            ...prev,
            [winner]: prev[winner as keyof typeof prev] + 1
          }));
        }
        setTimeout(() => router.push("/screens/game-over"), 500);
      } else {
        setCurrentPlayer((current) => (current === "X" ? "O" : "X"));
      }
    }
  };

  const resetGame = () => {
    playEffect("button", "medium");
    setBoard(Array(9).fill(""));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Player ${currentPlayer}'s Turn`,
          headerShown: true
        }}
      />
      <StatusBar style="auto" />

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
    padding: 20
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#ff6b6b"
  }
});
