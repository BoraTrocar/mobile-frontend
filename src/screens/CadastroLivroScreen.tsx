import { Picker } from "@react-native-picker/picker";
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
import {
  useTheme,
  IconButton,
  Dialog,
  Portal,
  Button,
} from "react-native-paper";
import LivroService from "../services/livro.service";
import styles from "../styles/CadastroLivroScreen";
import stylesGlobal from "../styles/globalStyles";

export default function CadastroLivroScreen() {
  const [img, setImg] = useState<string | null>(null);
  const [isbn, setIsbn] = useState("");
  const [nomeLivro, setNomeLivro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [condicao, setCondicao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isbnHelpVisible, setIsbnHelpVisible] = useState(false);

  const { colors } = useTheme();

  const handleCadastrar = async () => {
    setIsSubmitted(true);

    if (!nomeLivro || !categoria || !condicao) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (isbn && (isbn.length < 7 || isbn.length > 13)) {
      Alert.alert(
        "Erro",
        "O ISBN deve ter entre 7 e 13 dígitos, se for preenchido."
      );
      return;
    }

    try {
      await LivroService.cadastrarLivro({
        img,
        isbn,
        nomeLivro,
        categoria,
        autor,
        condicao,
        descricao,
      });
      Alert.alert("Sucesso", "Livro cadastrado com sucesso!");
      handleLimpar(); // Limpa os campos após o cadastro
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o livro.");
    }
  };

  const handleLimpar = () => {
    setImg(null);
    setIsbn("");
    setNomeLivro("");
    setCategoria("");
    setAutor("");
    setCondicao("");
    setDescricao("");
    setIsSubmitted(false);
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

  const handleIsbnChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setIsbn(numericValue.slice(0, 13));
  };

  const handleTextInputChange = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number
  ) => {
    const textOnly = text.replace(/[^a-zA-Z\s]/g, "");
    setter(textOnly.slice(0, maxLength));
  };

  const mostraIsbnAjuda = () => setIsbnHelpVisible(true);
  const hideIsbnHelp = () => setIsbnHelpVisible(false);

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
        <View style={styles.isbnContainer}>
          <TextInput
            style={[styles.input, styles.isbnInput]}
            placeholder="ISBN"
            value={isbn}
            onChangeText={handleIsbnChange}
            keyboardType="numeric"
            maxLength={13}
          />
          <IconButton
            icon="help-circle-outline"
            size={20}
            onPress={mostraIsbnAjuda}
            style={styles.iconButton}
          />
        </View>

        <TextInput
          style={[
            styles.input,
            isSubmitted && !nomeLivro ? stylesGlobal.errorInput : null,
          ]}
          placeholder="Título* "
          value={nomeLivro}
          onChangeText={setNomeLivro}
          maxLength={50}
        />

        <TextInput
          style={[
            styles.input,
            isSubmitted && !categoria ? stylesGlobal.errorInput : null,
          ]}
          placeholder="Categoria*"
          value={categoria}
          onChangeText={(text) => handleTextInputChange(text, setCategoria, 50)}
          maxLength={30}
        />

        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={(text) => handleTextInputChange(text, setAutor, 50)}
          maxLength={50}
        />

        {/* Tem que arrumar o estilo */}
        <Picker
          selectedValue={condicao}
          onValueChange={(itemValue) => setCondicao(itemValue)}
          style={[
            styles.input,
            isSubmitted && !condicao ? stylesGlobal.errorInput : null,
          ]}
        >
          <Picker.Item label="Selecione a Condição*" value="" />
          <Picker.Item label="Novo" value="novo" />
          <Picker.Item label="Usado" value="usado" />
          <Picker.Item label="Avariado" value="avariado" />
        </Picker>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição (máx. 500 caracteres)"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          maxLength={500}
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

        <Portal>
          <Dialog
            style={styles.dialogAjuda}
            visible={isbnHelpVisible}
            onDismiss={hideIsbnHelp}
          >
            <Dialog.Title style={styles.tituloDialog}>
              O que é ISBN?
            </Dialog.Title>
            <Dialog.Content>
              <Text>
                ISBN significa "International Standard Book Number". É um número
                único de 13 dígitos usado para identificar livros e outros tipos
                de publicações. Cada ISBN é único para um livro específico e
                ajuda na organização e busca de livros em todo o mundo.
              </Text>
            </Dialog.Content>
            <Dialog.Title style={styles.tituloDialog}>
              Onde encontra-lo?
            </Dialog.Title>
            <Dialog.Content>
              <Text>Atras do seu livro proximo ao codigo de barras!</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideIsbnHelp}>Entendi</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
}
