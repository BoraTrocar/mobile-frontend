import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { CardHorizontallivro } from "./livro";
import { LivroProps } from "@/models/LivroProps";
import { ApiService } from "@/services/api.service";

export function LivrosDestaque() {
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    async function getLivros() {
      try {
        const data = await apiService.get("/livros");
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
