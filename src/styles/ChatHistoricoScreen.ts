import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E3F2FD",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  msg: {
    color: "black",
  },
  data: {
    color: "#808080",
  },
  loading: {
    marginVertical: 250,
  },
});

export default styles;
