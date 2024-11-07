import { useRaio } from "@/RaioContext";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { LivroProps } from "../../models/LivroProps";
import LivroService from "../../services/livro.service";
import { CardHorizontallivro } from "./livro";

export function LivrosSugeridos() {
  const { raio } = useRaio();
  const [livros, setLivros] = useState<LivroProps[]>([]);

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
      renderItem={({ item }) => <CardHorizontallivro livro={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
