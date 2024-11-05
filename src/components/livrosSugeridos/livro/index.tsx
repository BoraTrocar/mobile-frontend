import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { LivroProps } from "../../../models/LivroProps";

export function CardHorizontallivro({ livro }: { livro: LivroProps }) {
  return (
    <Pressable>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: livro.imagem }} style={styles.cover} />
        <Card.Content style={styles.content}>
          <Title style={styles.title}>{livro.nomeLivro}</Title>
          <Paragraph style={styles.author}>{livro.autor}</Paragraph>
          <Paragraph style={styles.advertiser}>
            Anunciante: {livro.usuario}
          </Paragraph>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "white",
    width: 150,
    height: 270,
  },
  cover: {
    borderRadius: 12,
    height: 145,
  },
  content: {
    backgroundColor: "white",
    padding: 8,
  },
  title: {
    color: "green",
    fontSize: 16,
  },
  author: {
    color: "#000",
    fontSize: 14,
  },
  advertiser: {
    color: "#6e6e6e",
    fontSize: 12,
  },
});
