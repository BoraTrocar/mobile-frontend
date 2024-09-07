import { Header } from "@/components/header";
import { RootStackParamList } from "@/navigation/AppNavigator";
import globalStyles from "@/styles/globalStyles";
import styles from "@/styles/PerfilScreenStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import { Usuario } from "../models/Usuario";
import { UsuarioService } from "../services/usuario.service";

type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Perfil"
>;

export function PerfilScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const usuarioService = new UsuarioService();
  const navigation = useNavigation<PerfilScreenNavigationProp>();

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

  const goToCadastrarLivro = () => {
    navigation.navigate("CadastroLivro");
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
      <TouchableOpacity
        style={styles.cadastrarButton}
        onPress={goToCadastrarLivro}
      >
        <Text style={styles.buttonText}>Cadastrar Livro</Text>
      </TouchableOpacity>
      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
