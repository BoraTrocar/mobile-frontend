import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LivroProps } from "../../models/LivroProps";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { ApiService } from "../../services/api.service";
import { AnuncioItem } from "./item";

export function AnunciostListaVertical() {
  const [anuncios, setAnuncios] = useState<LivroProps[]>([]);
  const apiService = new ApiService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // tem q ir para o service essa func busca os anúncios
  const getAnuncios = async () => {
    try {
      const data = await apiService.get("/livro/all");
      setAnuncios(data);
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
    }
  };

  //Gambiarra para atualizar o componente 
  useFocusEffect(
    useCallback(() => {
      getAnuncios(); // Vai mandar a request sempre o componente for chamado (em tese)
    }, [])
  );

  const handlePress = (item: LivroProps) => {
    navigation.navigate("DetalhesDoLivroScreen", { livro: item });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {anuncios.map((item) => (
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
    marginBottom:50,
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
