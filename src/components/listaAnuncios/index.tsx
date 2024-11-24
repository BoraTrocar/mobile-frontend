import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LivroProps } from "../../models/LivroProps";
import { RootStackParamList } from "../../navigation/AppNavigator";
import LivroService from "../../services/livro.service";
import { AnuncioItem } from "./item";

interface AnunciostListaVerticalProps {
  resultadosPesquisa: LivroProps[] | null;
}

const PAGE_SIZE = 4;

export function AnunciostListaVertical({
  resultadosPesquisa,
}: AnunciostListaVerticalProps) {
  const [anuncios, setAnuncios] = useState<LivroProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getAnuncios = async (currentPage: number) => {
    if (loading || isEndReached) return;

    try {
      setLoading(true);
      const data = await LivroService.obterLivrosPaginados(
        currentPage,
        PAGE_SIZE
      );

      if (data.length === 0) {
        setIsEndReached(true);
        return;
      }

      setAnuncios((prev) => [...prev, ...data]);
      setPage(currentPage);
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
    } finally {
      setLoading(false);
    }
  };

  //Sempre que a tela ganha foco e não há nada na pesquisa ele vai dar um get em todos os livros
  useFocusEffect(
    useCallback(() => {
      if (!resultadosPesquisa) {
        setAnuncios([]);
        setPage(0);
        setIsEndReached(false);
        getAnuncios(0);
      }
    }, [resultadosPesquisa])
  );

  const handlePress = (item: LivroProps) => {
    navigation.navigate("DetalhesDoLivroScreen", { livro: item });
  };

  const handleNextPage = () => {
    if (!loading && !isEndReached && !resultadosPesquisa) {
      const nextPage = page + 1;
      getAnuncios(nextPage);
    }
  };

  const livrosParaExibir = resultadosPesquisa || anuncios;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.grid}>
          {livrosParaExibir.map((item) => (
            <View key={item.idLivro.toString()} style={styles.itemContainer}>
              <AnuncioItem item={item} onPress={handlePress} />
            </View>
          ))}
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}
      </ScrollView>

      {!resultadosPesquisa && !isEndReached && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.nextPageButton,
              (loading || isEndReached) && styles.nextPageButtonDisabled,
            ]}
            onPress={handleNextPage}
            disabled={loading || isEndReached}
          >
            <Text style={styles.nextPageButtonText}>
              {loading ? "Carregando..." : "Carregar mais"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingVertical: 0,
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
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  paginationContainer: {
    padding: 2,
    alignItems: "center",
  },
  nextPageButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  nextPageButtonDisabled: {
    backgroundColor: "#ccc",
  },
  nextPageButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
