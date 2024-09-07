import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { Usuario } from "../../models/Usuario";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { UsuarioService } from "../../services/usuario.service";

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, "Perfil">;

export function Header() {
  const { colors } = useTheme();
  const statusBarHeight = Constants.statusBarHeight;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const navigation = useNavigation<HeaderNavigationProp>();

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const usuarioService = new UsuarioService();
        const data = await usuarioService.getUsuario();
        if (data.length > 0) {
          setUsuario(data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUsuario();
  }, []);

  // Função para redirecionar para a tela de perfil
  const handleUserPress = () => {
    if (usuario) {
      navigation.navigate("Perfil");
    }
  };

  // Função para solicitar permissão de localização
  const requestLocationPermission = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
        console.log("Localização atual: ", currentPosition);
      } else {
        console.log("Permissão de localização negada");
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>Cotia</Text>
        <IconButton
          icon="map-marker"
          size={20}
          onPress={requestLocationPermission} // Chama a função ao clicar
          iconColor={"red"}
        />
      </View>
      {usuario && (
        <TouchableOpacity onPress={handleUserPress}>
          <Text style={styles.userName}>{usuario.nome}</Text>
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
