import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import Constants from "expo-constants";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { Usuario } from "../../models/Usuario";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { UsuarioService } from "../../services/usuario.service";
import { getToken } from "@/token/tokenStorage";

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, "Perfil">;

export function Header() {
  const { colors } = useTheme();
  const statusBarHeight = Constants.statusBarHeight;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const navigation = useNavigation<HeaderNavigationProp>();

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

  const requestLocationPermission = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        const { latitude, longitude } = currentPosition.coords;
        console.log("Localização obtida:", latitude, longitude);

        fetchCityFromCoordinates(latitude, longitude);
      } else {
        console.log("Permissão de localização negada");
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  const fetchCityFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const apiKey = "18624a987510c4a0758cc7006109c8e5";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      if (response.data.name) {
        const cityName = response.data.name;
        setCity(cityName);
        console.log("Cidade: ", cityName);
      } else {
        console.log("Não foi possível obter o nome da cidade");
      }
    } catch (error) {
      console.error("Erro ao buscar cidade:", error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>{city || "Localização Desconhecida"}</Text>
        <IconButton
          icon="map-marker"
          size={20}
          onPress={requestLocationPermission}
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
