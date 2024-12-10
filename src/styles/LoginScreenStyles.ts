import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: Constants.statusBarHeight + 20,
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#2196F3",
    fontSize: 16,
  },
  continueWithoutLoginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#B0BEC5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  continueWithoutLoginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fixedMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default styles;
