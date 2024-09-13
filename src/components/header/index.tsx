import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useLocation } from "../../../LocationContext";
import { Usuario } from "../../models/Usuario";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { UsuarioService } from "../../services/usuario.service";
import { getToken } from "../../token/tokenStorage";

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, "Perfil">;

export function Header() {
  const { colors } = useTheme();
  const statusBarHeight = Constants.statusBarHeight;
  const navigation = useNavigation<HeaderNavigationProp>();
  const { cidade, atualizaLocalizacao } = useLocation();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Token não encontrado");
        }

        const usuarioService = new UsuarioService();
        const data = await usuarioService.perfilUsuario(token);
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUsuario();
  }, []);

  const handleUserPress = () => {
    if (usuario) {
      navigation.navigate("Perfil");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>{cidade || "Localização Desconhecida"}</Text>
        <IconButton
          icon="map-marker"
          size={20}
          onPress={atualizaLocalizacao} // Atualizando a localização ao clicar
          iconColor={colors.primary}
        />
      </View>
      {usuario && (
        <TouchableOpacity onPress={handleUserPress}>
          <Text style={styles.userName}>{usuario.nomeCompleto}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    color: "gray",
  },
});
