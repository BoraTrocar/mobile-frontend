import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 10,
  },
  messageCard: {
    marginBottom: 8,
  },
  noMessagesText: {
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginBottom: "15%",
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },

  //ESTA MERDA DE REACT NATIVE É UM LIXO E NAO DA PARA FAZER UMA CARALHA DE BOTAO DIREITO
  sendButton: {
    backgroundColor: "#4eb3de",

    height: 40,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
