import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilledButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const FilledButton: React.FC<FilledButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onClick} disabled={disabled}>
      <View style={disabled ? styles.disabledButton : styles.enabledButton}>
        <Text
          style={disabled ? styles.disabledText : styles.enabledText}
          className="font-poppins"
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const baseButtonStyle = {
  height: 40,
  borderRadius: 100,
  gap: 8,
  paddingHorizontal: 24,
  paddingVertical: 10,
};

const styles = StyleSheet.create({
  enabledButton: {
    ...baseButtonStyle,
    backgroundColor: "#2E4D90",
    alignSelf: "flex-start",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    ...baseButtonStyle,
    backgroundColor: "#1D1B201F",
    alignSelf: "flex-start",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  enabledText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: "center",
    color: "white",
  },
  disabledText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: "center",
    color: "rgba(29, 27, 32, 0.38)",
  },
});

export default FilledButton;
