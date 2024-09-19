import { useNavigation } from "@react-navigation/native";
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
import { useTheme } from "react-native-paper";
import { UsuarioCadastro } from "../models/UsuarioCadastro";
import { RootStackParamList } from "../navigation/AppNavigator";
import { CepService } from "../services/cep.service";
import { UsuarioService } from "../services/usuario.service";
import styles from "../styles/CadastroUsuarioScreenStyles";
import stylesGlobal from "../styles/globalStyles";

type CadastroUsuarioScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const usuarioService = new UsuarioService();
const cepService = new CepService();

export default function CadastroUsuarioScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<CadastroUsuarioScreenNavigationProp>();

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const [errorFields, setErrorFields] = useState<string[]>([]);

  /* Por enquanto vai ficar assim nao sei fazer melhor nao */
  const handleSignUpPress = async () => {
    const errors = [];
    if (!nomeUsuario || nomeUsuario.length < 3) {
      errors.push("nomeUsuario");
    }
    if (!email || email.length < 5) {
      errors.push("email");
    }
    if (!nickname || nickname.length < 3) {
      errors.push("nickname");
    }
    if (!senha || senha.length < 5) {
      errors.push("senha");
    }
    if (!dataNascimento) {
      errors.push("dataNascimento");
    }

    if (errors.length > 0) {
      setErrorFields(errors);
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha todos os campos obrigatórios com os requisitos mínimos."
      );
      return;
    }

    const newUser: UsuarioCadastro = {
      nomeUsuario,
      email,
      nickname,
      senha,
      dataNascimento,
      cep,
      cidade,
      uf,
    };

    // teste para mostrar oq ta sendo enviado aaaaaaaaaaaaaaaaaaa.
    //console.log("Dados enviados:", JSON.stringify(newUser, null, 2));

    try {
      await usuarioService.cadastrarUsuario(newUser);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      let errorMessage = "Ocorreu um erro desconhecido.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert(
        "Erro",
        `Ocorreu um erro ao realizar o cadastro: ${errorMessage}`
      );
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };

  const getInputStyle = (fieldName: string) => {
    return errorFields.includes(fieldName)
      ? [styles.input, stylesGlobal.errorInput]
      : styles.input;
  };

  const handleNomeUsuarioChange = (text: string) => {
    const lettersOnly = text.replace(/[^a-zA-Z]/g, "");
    setNomeUsuario(lettersOnly.slice(0, 40));
    setErrorFields((prev) => prev.filter((f) => f !== "nomeUsuario"));
  };

  return (
    /* Depois tem que ver para transformar cada input um componente ou algo assim */
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Cadastro</Text>

          <TextInput
            style={getInputStyle("nomeUsuario")}
            placeholder="Nome de Usuário* (max. 50)"
            value={nomeUsuario}
            onChangeText={handleNomeUsuarioChange}
            maxLength={50}
          />

          <TextInput
            style={getInputStyle("email")}
            placeholder="E-mail*"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text.slice(0, 85));
              setErrorFields((prev) => prev.filter((f) => f !== "email"));
            }}
            maxLength={100}
          />

          <TextInput
            style={getInputStyle("nickname")}
            placeholder="Nickname* (máx. 30)"
            value={nickname}
            onChangeText={(text) => {
              setNickname(text.slice(0, 30));
              setErrorFields((prev) => prev.filter((f) => f !== "nickname"));
            }}
            maxLength={30}
          />

          <TextInput
            style={getInputStyle("senha")}
            placeholder="Senha* (min. 5)"
            secureTextEntry
            value={senha}
            onChangeText={(text) => {
              setSenha(text.slice(0, 50));
              setErrorFields((prev) => prev.filter((f) => f !== "senha"));
            }}
            maxLength={50}
          />

          <TextInput
            style={getInputStyle("dataNascimento")}
            placeholder="Data de Nascimento*"
            value={dataNascimento}
            keyboardType="numeric"
            onChangeText={(text) => {
              setDataNascimento(text);
              setErrorFields((prev) =>
                prev.filter((f) => f !== "dataNascimento")
              );
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="CEP"
            keyboardType="numeric"
            value={cep}
            onChangeText={(text) => {
              setCep(text);
              cepService.verificaCEP(text); // Verifica o CEP quando o usuário digitar
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
          />

          <TextInput
            style={styles.input}
            placeholder="UF"
            value={uf}
            onChangeText={setUf}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={handleBackToLogin}>
            <Text style={styles.linkText}>Voltar para Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
