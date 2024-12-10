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
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 16,
    width: "100%",
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
  cadastrarButton: {
    width: "80%",
    alignSelf: "center",
    height: 50,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  livrosContainer: {
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
    maxHeight: 300,
  },
  livroCard: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "100%",
  },
  livroTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  vazio: {
    textAlign: "center",
    color: "#000",
  },
  settingsMenu: {
    position: "absolute",
    right: 1,
    zIndex: 1,
  },
  teste: {
    marginTop: 80,
  },
});

export default styles;
