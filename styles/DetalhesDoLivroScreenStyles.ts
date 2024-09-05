import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    paddingTop: 25,
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingTop: 16,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  largeCard: {
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 4,
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
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
    marginVertical: 16,
    alignSelf: "center",
    backgroundColor: "#4eb3de",
  },
  buttonContent: {
    height: 45,
    paddingHorizontal: 100,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default styles;
