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
    backgroundColor: "#E3F2FD",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
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
  imageUrlInput: {
    display: "none", // Esconde o campo de texto da URL da imagem
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cadastrarButton: {
    backgroundColor: "#2196F3",
  },
  limparButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  imagePickerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  cameraButton: {
    backgroundColor: "#FF5722", // Cor diferente para o botão da câmera
  },
  image: {
    width: 150,
    height: 170,
    borderRadius: 8,
    marginBottom: 20,
  },

  /* OBRA DE ARTE ISSO AQUI */
  isbnContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  isbnInput: {
    flex: 1,
    marginBottom: 0,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    borderColor: "#fff",
  },
  iconButton: {
    padding: 0,
  },
  dialogAjuda: {
    backgroundColor: "#fff",
  },
  tituloDialog: {
    color: "#000",
    marginBottom: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default styles;
