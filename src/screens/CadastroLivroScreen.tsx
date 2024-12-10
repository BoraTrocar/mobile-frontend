import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { uploadImage } from "../../firebaseConfig";
import { AjudaISBN } from "../components/ajudaISBN";
import { CadastroImg } from "../components/cadastroImg";
import { RootStackParamList } from "../navigation/AppNavigator";
import LivroService from "../services/livro.service";
import styles from "../styles/CadastroLivroScreen";
import stylesGlobal from "../styles/globalStyles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CadastroLivroScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [img, setImg] = useState<string | null>(null);
  const [isbn, setIsbn] = useState("");
  const [nomeLivro, setNomeLivro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [condicao, setCondicao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isbnHelpVisible, setIsbnHelpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    try {
      let imageUrl = null;
      if (img) {
        imageUrl = await uploadImage(img);
      }

      await LivroService.cadastrarLivro({
        imagem: imageUrl,
        isbn,
        nomeLivro,
        categoria,
        autor,
        condicao,
        descricao,
      });
      Alert.alert("Sucesso", "Livro cadastrado com sucesso!");
      handleLimpar();
      navigation.navigate("Perfil");
    } catch (error) {
      console.error("Error cadastrando livro: ", error);
      Alert.alert("Erro", "Não foi possível cadastrar o livro.");
    } finally {
      setIsLoading(false);
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

        <CadastroImg img={img} onImageSelect={setImg} />

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
            iconColor={colors.primary}
            size={20}
            onPress={mostraIsbnAjuda}
          />
        </View>

        <AjudaISBN visible={isbnHelpVisible} onDismiss={hideIsbnHelp} />

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

        <Picker
          selectedValue={condicao}
          onValueChange={(itemValue) => setCondicao(itemValue)}
          style={[
            styles.input,
            isSubmitted && !condicao ? stylesGlobal.errorInput : null,
          ]}
        >
          <Picker.Item label="Selecione a Condição*" value="" />
          <Picker.Item label="Novo" value="NOVO" />
          <Picker.Item label="Usado" value="USADO" />
          <Picker.Item label="Avariado" value="AVARIADO" />
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
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
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
