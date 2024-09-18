import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useLocation } from "../../../LocationContext";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useAuth } from "../../hooks/useAuth";

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, "Perfil">;

export function Header() {
  const { colors } = useTheme();
  const statusBarHeight = Constants.statusBarHeight;
  const navigation = useNavigation<HeaderNavigationProp>();
  const { cidade, atualizaLocalizacao } = useLocation();
  const { isAutenticado, usuario } = useAuth();

  const handleUserPress = () => {
    if (isAutenticado) {
      navigation.navigate("Perfil");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>{cidade || "Localização Desconhecida"}</Text>
        <IconButton
          icon="map-marker"
          size={20}
          onPress={atualizaLocalizacao}
          iconColor={colors.primary}
        />
      </View>
      <TouchableOpacity onPress={handleUserPress}>
        {isAutenticado && usuario ? (
          <Text style={styles.userName}>{usuario.nomeCompleto}</Text>
        ) : (
          <Text style={styles.loginText}>Entrar</Text>
        )}
      </TouchableOpacity>
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
  loginText: {
    fontSize: 18,
    color: "blue",
  },
});
