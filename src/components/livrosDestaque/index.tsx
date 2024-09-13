import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { LivroProps } from "../../models/LivroProps";
import { ApiService } from "../../services/api.service";
import { CardHorizontallivro } from "./livro";

export function LivrosDestaque() {
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    async function getLivros() {
      try {
        const data = await apiService.get("/livro/all");
        setLivros(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    getLivros();
  }, []);

  return (
    <FlatList
      data={livros}
      renderItem={({ item }) => <CardHorizontallivro livro={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
