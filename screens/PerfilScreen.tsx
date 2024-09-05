import { Header } from "@/components/header";
import globalStyles from "@/styles/globalStyles";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import { Usuario } from "../models/Usuario";
import { UsuarioService } from "../services/usuario.service";

export function PerfilScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const usuarioService = new UsuarioService();

  useEffect(() => {
    async function fetchUsuario() {
      try {
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

  const handleLogout = () => {
    console.log("Deslogado");
  };

  if (!usuario) {
    return (
      <View style={styles.centered}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={handleLogout}
        icon="logout"
      >
        Sair
      </Button>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />
          <Text style={styles.name}>{usuario.nome}</Text>
          <Text style={styles.email}>{usuario.email}</Text>
          <Text style={styles.accountType}>{usuario.tipoConta}</Text>
        </View>
      </Card>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 16,
    paddingTop: 0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 50,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 16,
    width: "90%",
    alignSelf: "center",
  },
  cardContent: {
    alignItems: "center",
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "#2196F3",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  email: {
    color: "#616161",
  },
  accountType: {
    color: "#9E9E9E",
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 16,
    borderRadius: 5,
    alignSelf: "flex-end",
    backgroundColor: "#4eb3de",
  },
});
