import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Header } from "../components/header";
import { LivroPerfilCard } from "../components/livroPerfilCard"; // Corrija o caminho se necessário
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

export function PerfilScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const usuarioService = new UsuarioService();
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  useEffect(() => {
    async function fetchUsuario() {
      try {
        // Obtenha o token do AsyncStorage
        const token = await getToken();
        if (!token) {
          throw new Error("Token não encontrado");
        }

        // Busque os dados do usuário com o token
        const data: Usuario = await usuarioService.perfilUsuario(token);
        setUsuario(data); // Atualize o estado com os dados do usuário
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setCarregando(false); // Atualize o estado de carregamento
      }
    }
    fetchUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await removeToken(); // Remove o token
      console.log("Deslogado");
      navigation.navigate("Login"); // Redireciona para a tela de login (ou outra tela relevante)
    } catch (error) {
      console.error("Erro ao deslogar:", error);
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
        <Button
          mode="contained"
          style={styles.logoutButton}
          onPress={handleLogout}
          icon="logout"
          children={undefined}
        />
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
            <Text>Nenhum livro postado</Text>
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
    </View>
  );
}
