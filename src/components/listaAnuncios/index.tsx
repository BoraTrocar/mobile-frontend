import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LivroProps } from "../../models/LivroProps";
import { RootStackParamList } from "../../navigation/AppNavigator";
import LivroService from "../../services/livro.service";
import { AnuncioItem } from "./item";

interface AnunciostListaVerticalProps {
  resultadosPesquisa: LivroProps[] | null;
}

export function AnunciostListaVertical({
  resultadosPesquisa,
}: AnunciostListaVerticalProps) {
  const [anuncios, setAnuncios] = useState<LivroProps[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const getAnuncios = async () => {
    try {
      const data = await LivroService.obterTodosOsLivros();
      setAnuncios(data);
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
    }
  };

  //Sempre que a tela ganha foco e não há nada na pesquisa ele vai dar um get em todos os livros
  useFocusEffect(
    useCallback(() => {
      if (!resultadosPesquisa) {
        getAnuncios();
      }
    }, [resultadosPesquisa])
  );

  const handlePress = (item: LivroProps) => {
    navigation.navigate("DetalhesDoLivroScreen", { livro: item });
  };

  const livrosParaExibir = resultadosPesquisa || anuncios;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {livrosParaExibir.map((item) => (
          <View key={item.idLivro.toString()} style={styles.itemContainer}>
            <AnuncioItem item={item} onPress={handlePress} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    marginBottom: 16,
  },
});
