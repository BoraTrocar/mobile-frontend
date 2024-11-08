import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 5,
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingTop: 25,
  },
  largeCard: {
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 4,
    marginBottom: 16,
    width: "90%",
    margin: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 16,
  },
  image: {
    height: 400,
    borderRadius: 16,
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#4eb3de",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 45,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonLabel: {
    fontSize: 18,
    color: "white",
  },
  cardActionsContainer: {
    paddingVertical: 16,
    margin: "auto",
  },
});

export default styles;
