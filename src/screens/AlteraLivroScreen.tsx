import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu, useTheme } from "react-native-paper";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LivroProps } from "../models/LivroProps";
import LivroService from "../services/livro.service";
import styles from "../styles/AlterarLivroScreen";
import stylesGlobal from "../styles/globalStyles";
import { Picker } from "@react-native-picker/picker";
import { HorizontalMenu } from "../components/menu";
import { Header } from "../components/header";

type AlteraLivroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DetalhesDoLivroScreen"
>;

type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Perfil"
>;

//Ta com erro que os campos AUTOR e CATEGORIA nao carregam

export default function AlteraLivroScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<AlteraLivroScreenNavigationProp>();
  const route = useRoute();
  const { livro } = route.params as { livro: LivroProps };

  const [nomeLivro, setNomeLivro] = useState(livro.nomeLivro || "");
  const [isbn, setIsbn] = useState(livro.isbn || "");
  const [autor, setAutor] = useState(livro.autor || "");
  const [categoria, setCategoria] = useState(livro.categoria || "");
  const [condicao, setCondicao] = useState(livro.condicao || "");
  const [descricao, setDescricao] = useState(livro.descricao || "");
  const [image, setImage] = useState(livro.image || "");

  const handleUpdatePress = async () => {
    if (!nomeLivro || !categoria || !condicao) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedData = {
      isbn: livro.isbn,
      nomeLivro,
      categoria: livro.autor, //mano sla pq nao funciona
      autor,
      condicao,
      descricao,
    };

    try {
      await LivroService.alterarLivro(livro.idLivro, updatedData);
      Alert.alert("Sucesso", "Livro atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Perfil"),
        },
      ]);
    } catch (error) {
      let errorMessage = "Ocorreu um erro desconhecido.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert(
        "Erro",
        `Ocorreu um erro ao atualizar o livro: ${errorMessage}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Alterar Livro</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do Livro"
            value={nomeLivro}
            onChangeText={setNomeLivro}
          />

          <TextInput
            style={styles.input}
            placeholder="ISBN"
            value={isbn}
            onChangeText={setIsbn}
          />

          <TextInput
            style={styles.input}
            placeholder="Autor"
            value={autor}
            onChangeText={setAutor}
          />

          <TextInput
            style={styles.input}
            placeholder="Categoria"
            value={categoria}
            onChangeText={setCategoria}
          />

          <Picker
            selectedValue={condicao}
            onValueChange={(itemValue) => setCondicao(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Selecione a Condição*" value="" />
            <Picker.Item label="Novo" value="novo" />
            <Picker.Item label="Usado" value="usado" />
            <Picker.Item label="Avariado" value="avariado" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            multiline
            numberOfLines={4}
            onChangeText={setDescricao}
          />
          {/* 
          <TextInput
            style={styles.input}
            placeholder="URL da Imagem"
            value={image}
            onChangeText={setImage}
          /> */}

          <TouchableOpacity
            style={styles.salvarAlteracaoButton}
            onPress={handleUpdatePress}
          >
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Text>Voltar para perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <HorizontalMenu />
    </View>
  );
}
