import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import { LivroProps } from "../models/LivroProps";
import styles from "../styles/DetalhesDoLivroScreenStyles";
import globalStyles from "../styles/globalStyles";

export type RootStackParamList = {
  DetalhesDoLivroScreen: { livro: LivroProps }; // Tipo do livro
  Chat: { bookId: string; ownerUserId: string }; // Parâmetros esperados para a tela de chat
};

// Definição da rota para a tela de detalhes do livro
type DetalhesDoLivroScreenRouteProp = RouteProp<
  RootStackParamList,
  "DetalhesDoLivroScreen"
>;

// Definição da navegação para a tela de detalhes do livro
type DetalhesDoLivroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DetalhesDoLivroScreen"
>;

// Definindo os tipos de propriedades para o componente
type Props = {
  route: DetalhesDoLivroScreenRouteProp;
  navigation: DetalhesDoLivroScreenNavigationProp;
};

export function DetalhesDoLivroScreen({ route, navigation }: Props) {
  const { livro } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          <Card style={styles.largeCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineLarge" style={styles.title}>
                {livro.nomeLivro}
              </Text>
              <Card.Cover source={{ uri: livro.image }} style={styles.image} />
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Autor: </Text>
                {livro.autor}
              </Text>
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Anunciante: </Text>
                {livro.usuario}
              </Text>
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Categoria: </Text>
                {livro.categoria}
              </Text>
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Condição: </Text>
                {livro.condicao}
              </Text>
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Descrição: </Text>
                {livro.descricao}
              </Text>
            </Card.Content>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              onPress={() =>
                navigation.navigate("Chat", {
                  bookId: livro.idLivro,
                  ownerUserId: livro.usuario,
                })
              }
            >
              Chat
            </Button>
          </Card>
        </View>
      </ScrollView>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
