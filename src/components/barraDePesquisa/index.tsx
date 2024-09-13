import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, TextInput as PaperTextInput } from "react-native-paper";

export function BarraDePesquisa() {
  return (
    <View style={styles.container}>
      <PaperTextInput placeholder="Encontre um livro..." style={styles.input} />
      <IconButton
        icon="magnify"
        size={24}
        onPress={() => console.log("Buscar")}
        style={styles.iconButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "white",
  },
  iconButton: {
    marginLeft: 8,
  },
});
