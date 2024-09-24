import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Alert, Platform, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

/* So Deus e o chat GPT sabe como isso aqui funciona */

interface NotificacaoSettingsProps {
  onLogout: () => Promise<void>;
}

export const NotificacaoSettings: React.FC<NotificacaoSettingsProps> = ({
  onLogout,
}) => {
  const [visible, setVisible] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [horarioNotificacao, setHorarioNotificacao] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const abreMenu = () => setVisible(true);
  const fechaMenu = () => setVisible(false);

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
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <Menu
        visible={visible}
        onDismiss={fechaMenu}
        anchor={<IconButton icon="cog" size={24} onPress={abreMenu} />}
      >
        <Menu.Item
          onPress={() => {
            fechaMenu();
            onLogout();
          }}
          title="Deslogar"
          leadingIcon="logout"
        />
        <Menu.Item
          onPress={() => {
            fechaMenu();
            handleNotificacao();
          }}
          title="Notificações"
          leadingIcon="bell"
        />
      </Menu>

      {showTimePicker && (
        <DateTimePicker
          value={horarioNotificacao}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};
