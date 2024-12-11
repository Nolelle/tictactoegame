import { Text } from "@/app/components/themed/Text";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type GameBoardProps = {
  board: string[];
  onCellPress: (index: number) => void;
  currentPlayer: string;
  settings: {
    vibrationEnabled: boolean;
  };
};

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellPress,
  currentPlayer,
  settings
}) => {
  const handlePress = (index: number) => {
    if (board[index] === "") {
      if (settings.vibrationEnabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
};

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center"
  },
  cellMarked: {
    backgroundColor: "#f0f0f0"
  },
  cellText: {
    fontSize: 40,
    fontWeight: "bold"
  }
});
