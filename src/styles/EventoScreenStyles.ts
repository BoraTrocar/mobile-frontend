import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Cor de fundo
    padding: 16,
  },
  eventsContainer: {
    marginTop: 16,
  },
  selectedDate: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noEvents: {
    fontSize: 18,
    color: "#9E9E9E", // Cor para texto sem eventos
  },
  eventCard: {
    marginBottom: 8,
  },
});

export default styles;
