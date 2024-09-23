import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Card, IconButton, Menu, Text } from "react-native-paper";
import { Header } from "../components/header";
import { LivroPerfilCard } from "../components/livroPerfilCard";
import { HorizontalMenu } from "../components/menu";
import { LivroProps } from "../models/LivroProps";
import { Usuario } from "../models/Usuario";
import { RootStackParamList } from "../navigation/AppNavigator";
import { UsuarioService } from "../services/usuario.service";
import styles from "../styles/PerfilScreenStyles";
import globalStyles from "../styles/globalStyles";
import { getToken, removeToken } from "../token/tokenStorage";

type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Perfil"
>;

interface SettingsMenuProps {
  handleLogout: () => Promise<void>;
  handleNotificacao: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  handleLogout,
  handleNotificacao,
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="cog" size={24} onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            handleLogout();
          }}
          title="Deslogar"
          leadingIcon="logout"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            handleNotificacao();
          }}
          title="Notificações"
          leadingIcon="bell"
        />
      </Menu>
    </View>
  );
};

export function PerfilScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [horarioNotificacao, setHorarioNotificacao] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const usuarioService = new UsuarioService();
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Token não encontrado");
        }
        const data: Usuario = await usuarioService.perfilUsuario(token);
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setCarregando(false);
      }
    }

    fetchUsuario();
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
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
      }
    }
  };

  const handleLogout = async () => {
    try {
      await removeToken();
      console.log("Deslogado");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
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
              setShowTimePicker(true); // Mostra o DateTimePicker
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
      console.log(`Notificação agendada para (hora local): ${date}`);
      const trigger = new Date(date);
      trigger.setSeconds(0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete",
          body: "Esta é sua notificação agendada!",
        },
        trigger: {
          date: trigger,
        },
      });
    } catch (error) {
      console.error("Falha ao agendar a notificação:", error);
    }
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);

    if (selectedTime) {
      const currentDate = new Date();
      currentDate.setFullYear(
        selectedTime.getFullYear(),
        selectedTime.getMonth(),
        selectedTime.getDate()
      );
      currentDate.setHours(selectedTime.getHours());
      currentDate.setMinutes(selectedTime.getMinutes());
      currentDate.setSeconds(0);

      setHorarioNotificacao(currentDate);
      if (notificacoesAtivas) {
        scheduleNotification(currentDate);
        console.log(
          `Novo horário de notificação: ${currentDate.toLocaleTimeString()}`
        );
      }
    }
  };

  const goToCadastrarLivro = () => {
    navigation.navigate("CadastroLivro");
  };

  if (carregando) {
    return (
      <View style={styles.centered}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.centered}>
        <Text>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Card style={styles.card}>
        <View style={styles.settingsMenu}>
          <SettingsMenu
            handleLogout={handleLogout}
            handleNotificacao={handleNotificacao}
          />
        </View>
        <View style={styles.cardContent}>
          <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />
          <Text style={styles.name}>{usuario.nomeCompleto}</Text>
          <Text style={styles.email}>{usuario.email}</Text>
          <Text style={styles.accountType}>{usuario.tipoConta}</Text>
        </View>
        <ScrollView
          style={styles.livrosContainer}
          showsVerticalScrollIndicator={true}
        >
          {usuario.anunciosPostados.length > 0 ? (
            usuario.anunciosPostados.map((livro) => (
              <LivroPerfilCard
                key={livro.idLivro}
                livro={livro as LivroProps}
              />
            ))
          ) : (
            <Text style={styles.vazio}>Nenhum livro anunciado</Text>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.cadastrarButton}
          onPress={goToCadastrarLivro}
        >
          <Text style={styles.buttonText}>Cadastrar Livro</Text>
        </TouchableOpacity>
      </Card>
      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>

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
}
