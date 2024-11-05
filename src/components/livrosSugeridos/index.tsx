import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { LivroProps } from "../../models/LivroProps";
import LivroService from "../../services/livro.service";
import { CardHorizontallivro } from "./livro";

export function LivrosSugeridos() {
  const [livros, setLivros] = useState<LivroProps[]>([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await LivroService.livrosSugeridos(50);
        setLivros(response);
        console.log(response, "response");
      } catch (error) {
        console.error("Erro ao buscar livros sugeridos:", error);
      }
    };

    fetchLivros();
  }, []);

  return (
    <FlatList
      data={livros}
      keyExtractor={(item) => item.idLivro.toString()} // Atualizado para usar idLivro
      renderItem={({ item }) => <CardHorizontallivro livro={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
