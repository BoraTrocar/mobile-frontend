import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export function Header() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Cotia</Text>
          <IconButton
            icon="map-marker"
            size={20}
            style={styles.icon}
            onPress={() => console.log("Map Pin Pressed")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 4,
  },
});
