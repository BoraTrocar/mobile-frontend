import { HorizontalMenu } from "@/components/menu";
import styles from "@/styles/CadastroLivroScreen";
import globalStyles from "@/styles/globalStyles";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CadastroLivroScreen() {
  const [img, setImg] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [condicao, setCondicao] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleCadastrar = () => {
    console.log("Livro cadastrado", {
      img,
      isbn,
      categoria,
      autor,
      condicao,
      descricao,
    });
  };

  const handleLimpar = () => {
    setImg("");
    setIsbn("");
    setCategoria("");
    setAutor("");
    setCondicao("");
    setDescricao("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Cadastrar Livro</Text>

        <TextInput
          style={styles.input}
          placeholder="Imagem URL"
          value={img}
          onChangeText={setImg}
        />

        <TextInput
          style={styles.input}
          placeholder="ISBN"
          value={isbn}
          onChangeText={setIsbn}
        />

        <TextInput
          style={styles.input}
          placeholder="Categoria"
          value={categoria}
          onChangeText={setCategoria}
        />

        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />

        <TextInput
          style={styles.input}
          placeholder="Condição"
          value={condicao}
          onChangeText={setCondicao}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, styles.cadastrarButton]}
          onPress={handleCadastrar}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.limparButton]}
          onPress={handleLimpar}
        >
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </ScrollView>
  );
}
