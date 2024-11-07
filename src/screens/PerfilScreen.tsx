import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Header } from "../components/header";
import { LivroPerfilCard } from "../components/livroPerfilCard";
import { HorizontalMenu } from "../components/menu";
import { NotificacaoSettings } from "../components/notificacao";
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
  const [raio, setRaio] = useState<number | null>(null);

  const [carregando, setCarregando] = useState(true);
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
  }, []);

  const handleLogout = async () => {
    try {
      await removeToken();
      console.log("Deslogado");
      navigation.navigate("Login");
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

  const handleRaioChange = (novoRaio: number) => {
    setRaio(novoRaio);
    console.log(`Raio alterado para: ${novoRaio}`);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Card style={styles.card}>
        <View style={styles.settingsMenu}>
          <NotificacaoSettings
            onLogout={handleLogout}
            onRaioChange={handleRaioChange}
          />
        </View>
        <View style={styles.cardContent}>
          <Image source={{ uri: usuario.imagemPerfil }} style={styles.avatar} />
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
    </View>
  );
}
