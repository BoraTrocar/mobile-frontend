import notificacaoService from "@/src/services/notificacao.service";
import { UsuarioService } from "@/src/services/usuario.service";
import { getToken } from "@/src/token/tokenStorage";
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
  View,
} from "react-native";
import { LocationSettingsModal } from "../localizacao/localizacao";
import { PerfilMenu } from "../perfiMenu";

interface NotificacaoSettingsProps {
  onLogout: () => Promise<void>;
  onRaioChange: (raio: number) => void;
}
const usuarioService = new UsuarioService();

export const NotificacaoSettings: React.FC<NotificacaoSettingsProps> = ({
  onLogout,
}) => {
  const [visible, setVisible] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState<boolean | null>(
    null
  );
  const [horarioNotificacao, setHorarioNotificacao] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showNotificacaoModal, setShowNotificacaoModal] = useState(false);
  const [showRaioModal, setShowRaioModal] = useState(false);

  useEffect(() => {
    configuraNotificacao();
    fetchNotificacaoStatus();
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

  const fetchNotificacaoStatus = async () => {
    try {
      const token = await getToken();
      if (token) {
        const usuario = await usuarioService.perfilUsuario(token);
        // Ajuste o nome da propriedade conforme o retorno do seu backend
        setNotificacoesAtivas(usuario.notificacao);
        console.log('foi');
        
      }
    } catch (error) {
      console.error("Erro ao buscar status de notificação:", error);
      setNotificacoesAtivas(false);
    }
  };

  const handleNotificacao = () => {
    setShowNotificacaoModal(true);
  };

  const handleConfigLocalizacao = () => {
    setShowRaioModal(true);
  };

  const salvarNotificacoes = async () => {
    try {
      const novoEstadoNotificacoes = !notificacoesAtivas;
      await notificacaoService.patchNotificacaoUsuario(novoEstadoNotificacoes);
      setNotificacoesAtivas(novoEstadoNotificacoes);
      setShowNotificacaoModal(false);

      console.log(
        `Notificações ${novoEstadoNotificacoes ? "ativadas" : "desativadas"}`
      );

      if (novoEstadoNotificacoes) {
        scheduleNotification(horarioNotificacao);
      } else {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    } catch (error) {
      console.error("Erro ao atualizar notificações:", error);

      Alert.alert("Erro", "Não foi possível atualizar as notificações");
    }
  };

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
      setShowNotificacaoModal(false);
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

  const toggleMenu = () => setVisible((prev) => !prev);

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
        visible={showNotificacaoModal}
        onRequestClose={() => setShowNotificacaoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Configurações de Notificação</Text>
            <Text style={styles.modalText}>
              Ative as notificações e informe um horario para que possamos te
              lembrar de dar uma olhada nos anuncios!
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title={
                  notificacoesAtivas === null
                    ? "Carregando..."
                    : notificacoesAtivas
                    ? "Desativar"
                    : "Ativar"
                }
                onPress={salvarNotificacoes}
                disabled={notificacoesAtivas === null}
              />

              <Button
                title="Agendar Horário"
                onPress={() => setShowTimePicker(true)}
              />
            </View>
            <Button
              title="Cancelar"
              onPress={() => setShowNotificacaoModal(false)}
            />
          </View>
        </View>
      </Modal>

      <LocationSettingsModal
        visible={showRaioModal}
        onClose={() => setShowRaioModal(false)}
      />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10%",
  },
});
