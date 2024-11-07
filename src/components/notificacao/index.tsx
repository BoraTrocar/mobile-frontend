import { useRaio } from "@/RaioContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PerfilMenu } from "../perfiMenu";

interface NotificacaoSettingsProps {
  onLogout: () => Promise<void>;
  onRaioChange: (raio: number) => void;
}

export const NotificacaoSettings: React.FC<NotificacaoSettingsProps> = ({
  onLogout,
}) => {
  const [visible, setVisible] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [horarioNotificacao, setHorarioNotificacao] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRaioModal, setShowRaioModal] = useState(false);
  const { raio, setRaio } = useRaio();
  const [inputRaio, setInputRaio] = useState("");

  useEffect(() => {
    configuraNotificacao();
  }, []);

  const configuraNotificacao = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert(
          "Permissão de Notificações",
          "É necessário permitir notificações para receber lembretes.",
          [{ text: "OK" }]
        );
        return;
      }
    }

    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  };

  const handleNotificacao = () => {
    Alert.alert(
      "Configurações de Notificação",
      "Configure suas preferências de notificação",
      [
        {
          text: notificacoesAtivas
            ? "Desativar Notificações"
            : "Ativar Notificações",
          onPress: () => {
            setNotificacoesAtivas((prev) => !prev);
            console.log(
              `Notificações ${notificacoesAtivas ? "desativadas" : "ativadas"}`
            );
          },
        },
        {
          text: "Agendar Horário",
          onPress: () => {
            if (notificacoesAtivas) {
              setShowTimePicker(true);
            } else {
              Alert.alert(
                "Notificações estão desativadas",
                "Ative as notificações para agendar um horário."
              );
            }
          },
        },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: false }
    );
  };

  const handleConfigLocalizacao = () => {
    setShowRaioModal(true);
  };

  const salvarRaio = () => {
    const valor = parseInt(inputRaio);
    if (!isNaN(valor) && valor > 0) {
      setRaio(valor);
      setShowRaioModal(false);
      setInputRaio("");
      console.log(`Raio de ${valor} km definido.`);
    } else {
      Alert.alert("Valor inválido", "Insira um número válido.");
    }
  };

  const toggleMenu = () => setVisible((prev) => !prev);

  const scheduleNotification = async (date: Date) => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      const trigger = new Date(date);
      trigger.setSeconds(0);
      trigger.setMilliseconds(0);

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Bora Trocar!",
          body: "Dê uma olhada nos novos anuncios!",
          sound: true,
        },
        trigger,
      });

      console.log(
        `Notificação agendada com ID: ${id} para (hora local): ${trigger.toLocaleString()}`
      );
    } catch (error) {
      console.error("Falha ao agendar a notificação:", error);
      Alert.alert(
        "Erro",
        "Não foi possível agendar a notificação. Por favor, tente novamente."
      );
    }
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(Platform.OS === "ios");

    if (selectedTime) {
      const currentDate = new Date();
      currentDate.setHours(selectedTime.getHours());
      currentDate.setMinutes(selectedTime.getMinutes());
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      setHorarioNotificacao(currentDate);
      if (notificacoesAtivas) {
        scheduleNotification(currentDate);
      }
    }
  };

  return (
    <>
      <PerfilMenu
        visible={visible}
        onDismiss={toggleMenu}
        onLogout={onLogout}
        onNotificationPress={handleNotificacao}
        onConfigLocationPress={handleConfigLocalizacao}
      />

      {showTimePicker && (
        <DateTimePicker
          value={horarioNotificacao}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Modal
        transparent={true}
        visible={showRaioModal}
        onRequestClose={() => setShowRaioModal(false)}
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
              <Button
                title="Cancelar"
                onPress={() => setShowRaioModal(false)}
              />
              <Button title="Salvar" onPress={salvarRaio} />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
