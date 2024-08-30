import { RootStackParamList } from "@/navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import globalStyles from "../styles/globalStyles";

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
      {/*    <Appbar.Header>
        <Appbar.Content title="Detalhes do Livro" />
      </Appbar.Header>
 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          <Card style={styles.largeCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="headlineLarge" style={styles.title}>
                {livro.name}
              </Text>
              <Card.Cover source={{ uri: livro.image }} style={styles.image} />
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Autor: </Text>
                {livro.autor}
              </Text>
              <Text variant="bodyLarge" style={styles.info}>
                <Text style={styles.bold}>Anunciante: </Text>
                {livro.anunciante}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    paddingTop: 25,
  },
  scrollContainer: {
    paddingBottom: 80,
    paddingTop: 16,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  largeCard: {
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 4,
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 16,
  },
  image: {
    height: 400,
    borderRadius: 16,
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    marginVertical: 16,
    alignSelf: "center",
    backgroundColor: "#4eb3de",
  },
  buttonContent: {
    height: 45,
    paddingHorizontal: 100,
  },
  buttonLabel: {
    fontSize: 18,
  },
});
