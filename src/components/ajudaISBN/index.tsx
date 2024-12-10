import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Dialog, Portal } from "react-native-paper";

interface AjudaISBNProps {
  visible: boolean;
  onDismiss: () => void;
}

export function AjudaISBN({ visible, onDismiss }: AjudaISBNProps) {
  return (
    <Portal>
      <Dialog
        style={styles.dialogAjuda}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Title style={styles.tituloDialog}>O que é ISBN?</Dialog.Title>
        <Dialog.Content>
          <View>
            <Text>
              ISBN significa "International Standard Book Number". É um número
              único de 13 dígitos usado para identificar livros e outros tipos
              de publicações. Cada ISBN é único para um livro específico e ajuda
              na organização e busca de livros em todo o mundo.
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Title style={styles.tituloDialog}>
          Onde encontrá-lo?
        </Dialog.Title>
        <Dialog.Content>
          <View>
            <Text>Atrás do seu livro próximo ao código de barras!</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="text" onPress={onDismiss}>
            Entendi
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogAjuda: {
    backgroundColor: "#fff",
  },
  tituloDialog: {
    color: "#000",
    marginBottom: 5,
  },
  button: {
    color: "#000",
  },
});
