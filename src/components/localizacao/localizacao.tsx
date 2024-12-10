import { useRaio } from "@/RaioContext";
import localizacaoService from "@/src/services/localizacao.service";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface LocationSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LocationSettingsModal: React.FC<LocationSettingsModalProps> = ({
  visible,
  onClose,
}) => {
  const { raio, setRaio } = useRaio();
  const [inputRaio, setInputRaio] = useState("");

  //MANO NEM SEI COMO DEU CERTO
  useEffect(() => {
    if (visible) {
      setInputRaio(raio ? raio.toString() : "");
    }
  }, [visible, raio]);

  const salvarRaio = async () => {
    const valor = parseFloat(inputRaio);
    if (!isNaN(valor) && valor > 0) {
      try {
        await localizacaoService.patchRaioUsuario(valor);

        setRaio(valor);
        setInputRaio("");
        onClose();
        console.log(`Raio de ${valor} km definido.`);
      } catch (error) {
        console.error("Erro ao atualizar raio:", error);
        Alert.alert(
          "Erro",
          "Não foi possível atualizar o raio. Tente novamente."
        );
      }
    } else {
      Alert.alert("Valor inválido", "Insira um número válido.");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Configuração de Localização</Text>
          <Text style={styles.modalText}>
            Insira o raio em quilômetros para receber sugestões de livros:
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputRaio}
            onChangeText={setInputRaio}
            placeholder="Digite o raio em km"
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={onClose} color="gray" />
            <Button title="Salvar" onPress={salvarRaio} color="green" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
