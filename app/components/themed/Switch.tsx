import React from "react";
import { Switch as RNSwitch, StyleSheet, Text, View } from "react-native";

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
};

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#2196F3" : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 4
  },
  label: {
    fontSize: 16,
    marginRight: 10
  }
});

export default Switch;
