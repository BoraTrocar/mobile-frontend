import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import styles from "@/styles/CadastroLivroScreen";

export default function CadastroLivroScreen() {
  const [img, setImg] = useState<string | null>(null);
  const [isbn, setIsbn] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [condicao, setCondicao] = useState("");
  const [descricao, setDescricao] = useState("");

  const { colors } = useTheme();

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
    setImg(null);
    setIsbn("");
    setCategoria("");
    setAutor("");
    setCondicao("");
    setDescricao("");
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImg(result.assets[0].uri || null);
    }
  };

  const handleOpenCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImg(result.assets[0].uri || null);
    }
  };

  const handleImagePress = () => {
    Alert.alert("Escolher Imagem", "Escolha uma opção", [
      {
        text: "Escolher Imagem",
        onPress: handlePickImage,
      },
      {
        text: "Abrir Câmera",
        onPress: handleOpenCamera,
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Cadastrar Livro</Text>

        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={
              img ? { uri: img } : require("@/assets/images/placeholder.jpg")
            }
            style={styles.image}
          />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, styles.imageUrlInput]}
          placeholder="Imagem URL"
          value={img || ""}
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
    </ScrollView>
  );
}
