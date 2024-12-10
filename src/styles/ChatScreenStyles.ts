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
    padding: 8,
    borderRadius: 10,
    maxWidth: "90%",
    alignSelf: "flex-start",
    backgroundColor: "#DCF8C6",
  },
  txtMsgTitle: {
    color: "black",
    fontWeight: "800",
  },
  txtMsg: {
    color: "black",
  },
  noMessagesText: {
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginBottom: "15%",
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },
  textInputFocused: {
    borderColor: "#4eb3de", // Cor da borda quando em foco
    backgroundColor: "#F0F8FF", // Cor de fundo mais clara ao focar
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },

  //ESTA MERDA DE REACT NATIVE É UM LIXO E NAO DA PARA FAZER UMA CARALHA DE BOTAO DIREITO
  sendButton: {
    backgroundColor: "#4eb3de",
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
