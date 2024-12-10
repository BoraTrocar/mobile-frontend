import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  fixedMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});

export default globalStyles;
