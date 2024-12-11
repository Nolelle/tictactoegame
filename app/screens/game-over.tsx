import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Button } from "../components/themed/Button";
import { Text } from "../components/themed/Text";

export default function GameOverScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handlePlayAgain = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/game");
  };

  const handleMainMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Game Over",
          headerShown: false
        }}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text
          style={styles.gameOver}
          variant="header"
        >
          Game Over!
        </Text>
        <Text style={styles.finalScore}>Final Score: 0-3</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Play Again"
            onPress={handlePlayAgain}
            style={styles.playAgainButton}
          />
          <Button
            title="Main Menu"
            onPress={handleMainMenu}
            style={styles.menuButton}
          />
        </View>
      </Animated.View>
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
  content: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  gameOver: {
    fontSize: 36,
    marginBottom: 20,
    color: "#4CAF50"
  },
  finalScore: {
    fontSize: 24,
    marginBottom: 30
  },
  buttonContainer: {
    width: "100%",
    gap: 10
  },
  playAgainButton: {
    backgroundColor: "#4CAF50"
  },
  menuButton: {
    backgroundColor: "#2196F3"
  }
});
