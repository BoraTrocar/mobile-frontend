import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { LivroProps } from "../../../models/LivroProps";

type Props = {
  item: LivroProps;
  onPress: (item: LivroProps) => void; // Adiciona a função onPress como propriedade
};

export function AnuncioItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.cardWrapper}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.nomeLivro}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.author}>{item.autor}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "white",
    margin: 8,
  },
  card: {
    borderRadius: 12,
    elevation: 0, // Remove a elevação do Card para o estilo wrapper
    backgroundColor: "white",
    height: 300,
  },
  image: {
    height: 200,
    borderRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  author: {
    fontSize: 14,
    color: "#000",
  },
});
