import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

interface Props {
  name: string;
  size: "text-lg" | "text-xl" | "text-2xl";
  label: string;
  action: () => void;
  textColor?: string;
  labelColor?: string; // Adicionado para definir a cor do rótulo
}

export function Section({
  name,
  size,
  label,
  action,
  textColor = "#000",
  labelColor = "#000", // Valor padrão para a cor do rótulo
}: Props) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            fontSize: size === "text-lg" ? 18 : size === "text-xl" ? 20 : 24,
            color: textColor,
          },
        ]}
      >
        {name}
      </Text>
      <Button
        mode="text"
        onPress={action}
        labelStyle={{ color: labelColor }} // Definindo a cor do rótulo
      >
        {label}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: "700",
    marginVertical: 16,
  },
});
