import { RootStackParamList } from "@/navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import globalStyles from "../styles/globalStyles";
import styles from "../styles/DetalhesDoLivroScreenStyles";
import { Header } from "@/components/header";

type DetalhesDoLivroScreenRouteProp = RouteProp<
  RootStackParamList,
  "DetalhesDoLivroScreen"
>;
type DetalhesDoLivroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DetalhesDoLivroScreen"
>;

type Props = {
  route: DetalhesDoLivroScreenRouteProp;
  navigation: DetalhesDoLivroScreenNavigationProp;
};

export function DetalhesDoLivroScreen({ route, navigation }: Props) {
  const { livro } = route.params;

  return (
    <View style={styles.container}>
      {/*  <Header /> */}
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
              onPress={() => navigation.navigate("Chat")}
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
