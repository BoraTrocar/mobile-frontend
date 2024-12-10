import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, TextInput as PaperTextInput } from "react-native-paper";
import { LivroProps } from "../../models/LivroProps";
import { PesquisaService } from "../../services/pesquisa.service";
import livroService from "@/src/services/livro.service";

interface BarraDePesquisaProps {
  onResultadosPesquisa: (resultados: LivroProps[]) => void;
}

export function BarraDePesquisa({
  onResultadosPesquisa,
}: BarraDePesquisaProps) {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const pesquisaService = new PesquisaService();

  const realizarPesquisa = async () => {
    try {
      let resultados;
      // Se o termo de pesquisa estiver vazio, buscar todos os livros
      if (termoPesquisa.trim() === "") {
        resultados = await livroService.obterTodosOsLivros();
      } else {
        resultados = await pesquisaService.pesquisarLivros(termoPesquisa);
      }

      onResultadosPesquisa(resultados);
    } catch (error) {
      console.error("Erro ao realizar a pesquisa:", error);
      onResultadosPesquisa([]);
    }
  };

  return (
    <View style={styles.container}>
      <PaperTextInput
        placeholder="Encontre um livro..."
        style={styles.input}
        value={termoPesquisa}
        onChangeText={setTermoPesquisa}
      />
      <IconButton
        icon="magnify"
        size={24}
        onPress={realizarPesquisa}
        style={styles.iconButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: "white",
  },
  iconButton: {
    marginLeft: 8,
  },
});
