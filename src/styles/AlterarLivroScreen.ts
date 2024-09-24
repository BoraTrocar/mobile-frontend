import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Cor de fundo principal
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: Constants.statusBarHeight + 20,
    backgroundColor: "#E3F2FD", // Mantendo a mesma cor de fundo
  },
  innerContainer: {
    width: "100%",
    alignItems: "center", // Centraliza os componentes
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Cor para título
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff", // Fundo branco para inputs
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd", // Borda cinza
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  salvarAlteracaoButton: {
    backgroundColor: "#2196F3",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold", // Texto dos botões
  },
});

export default styles;
