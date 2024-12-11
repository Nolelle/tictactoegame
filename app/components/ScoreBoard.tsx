import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../components/themed/Text";

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
  };
}

function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <View style={styles.scoreBoard}>
      <View style={styles.scoreItem}>
        <Text style={styles.scoreLabel}>X</Text>
        <Text style={styles.scoreValue}>{scores.X}</Text>
      </View>
      <View style={styles.scoreItem}>
        <Text style={styles.scoreLabel}>O</Text>
        <Text style={styles.scoreValue}>{scores.O}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 20
  },
  scoreItem: {
    alignItems: "center"
  },
  scoreLabel: {
    fontSize: 24,
    fontWeight: "bold"
  },
  scoreValue: {
    fontSize: 20,
    marginTop: 5
  }
});

export default ScoreBoard;
