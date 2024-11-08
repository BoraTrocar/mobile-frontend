import { useRaio } from "@/RaioContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { LivroProps } from "../../models/LivroProps";
import LivroService from "../../services/livro.service";
import { CardHorizontallivro } from "./livro";

type RootStackParamList = {
  DetalhesDoLivroScreen: { livro: LivroProps };
};

type LivrosNavigationProp = NavigationProp<RootStackParamList>;

export function LivrosSugeridos() {
  const { raio } = useRaio();
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const navigation = useNavigation<LivrosNavigationProp>();

  const handlePress = (livro: LivroProps) => {
    navigation.navigate("DetalhesDoLivroScreen", { livro });
  };

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await LivroService.livrosSugeridos(raio);
        setLivros(response);
      } catch (error) {
        console.error("Erro ao buscar livros sugeridos:", error);
      }
    };

    fetchLivros();
  }, [raio]);

  return (
    <FlatList
      data={livros}
      keyExtractor={(item) => item.idLivro.toString()}
      renderItem={({ item }) => (
        <CardHorizontallivro livro={item} onPress={handlePress} />
      )}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
