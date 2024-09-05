import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 16,
    paddingTop: 0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 50,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 16,
    width: "90%",
    alignSelf: "center",
  },
  cardContent: {
    alignItems: "center",
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "#2196F3",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  email: {
    color: "#616161",
  },
  accountType: {
    color: "#9E9E9E",
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 16,
    borderRadius: 5,
    alignSelf: "flex-end",
    backgroundColor: "#4eb3de",
  },
});

export default styles;
