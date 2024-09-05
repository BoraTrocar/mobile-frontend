import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { Usuario } from "../../models/Usuario";
import { UsuarioService } from "../../services/usuario.service";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator"; // Ajuste o caminho conforme necessário

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, "Perfil">;

export function Header() {
  const { colors } = useTheme();
  const statusBarHeight = Constants.statusBarHeight;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigation = useNavigation<HeaderNavigationProp>(); // Definindo o tipo de navegação

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
      navigation.navigate("Perfil"); // Usando o tipo de navegação correto
    }
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>Cotia</Text>
        <IconButton
          icon="map-marker"
          size={20}
          onPress={() => console.log("Map Pin Pressed")}
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
