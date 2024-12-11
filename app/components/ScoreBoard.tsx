import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Text from "./themed/Text";

interface ScoreBoardProps {
  scores?: {
    X: number;
    O: number;
  };
}

function ScoreBoard({ scores: propScores }: ScoreBoardProps) {
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const loadScores = async () => {
      try {
        const savedScores = await AsyncStorage.getItem("scores");
        if (savedScores) {
          setScores(JSON.parse(savedScores));
        }
      } catch (error) {
        console.error("Error loading scores:", error);
      }
    };
    loadScores();
  }, []);

  useEffect(() => {
    if (propScores) {
      setScores(propScores);
    }
  }, [propScores]);

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
