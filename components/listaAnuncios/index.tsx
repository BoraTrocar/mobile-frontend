// AnunciostListaVertical.tsx
import { LivroProps } from "@/models/LivroProps";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { ApiService } from "@/services/api.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AnuncioItem } from "./item";

export function AnunciostListaVertical() {
  const [anuncios, setAnuncios] = useState<LivroProps[]>([]);
  const apiService = new ApiService();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function getAnuncios() {
      try {
        const data = await apiService.get("/livro/all");
        setAnuncios(data);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
      }
    }

    getAnuncios();
  }, []);

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
