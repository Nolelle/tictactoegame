import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet
} from "react-native";

interface TextProps extends RNTextProps {
  variant?: "header" | "body" | "caption";
}

const Text: React.FC<TextProps> = ({ style, variant = "body", ...props }) => {
  return (
    <RNText
      style={[
        styles.base,
        variant === "header" && styles.header,
        variant === "caption" && styles.caption,
        style
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    color: "#000"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold"
  },
  caption: {
    fontSize: 14,
    color: "#666"
  }
});

export default Text;
