import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { triggerHaptic } from "../utils/haptics";
import Text from "./themed/Text";

interface GameBoardProps {
  board: string[];
  onCellPress: (index: number) => void;
  currentPlayer: string;
  settings: {
    vibrationEnabled: boolean;
  };
}

function GameBoard({
  board,
  onCellPress,
  currentPlayer,
  settings
}: GameBoardProps) {
  const handlePress = async (index: number) => {
    if (board[index] === "") {
      if (settings.vibrationEnabled) {
        await triggerHaptic("light");
      }
      onCellPress(index);
    }
  };

  return (
    <View style={styles.board}>
      {board.map((cell, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.cell, cell !== "" && styles.cellMarked]}
          onPress={() => handlePress(index)}
          disabled={cell !== ""}
        >
          <Text style={styles.cellText}>{cell}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    backgroundColor: "#f0f0f0"
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  cellMarked: {
    backgroundColor: "#dcdcdc"
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  }
});

export default GameBoard;
