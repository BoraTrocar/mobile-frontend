import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "../navigation/AppNavigator";
import { UsuarioService } from "../services/usuario.service";
import styles from "../styles/LoginScreenStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro

  const usuarioService = new UsuarioService();

  const handleLogin = async () => {
    try {
      const usuario = { email, senha };
      await usuarioService.loginUsuario(usuario);
      console.log("Login realizado com sucesso");
      setErrorMessage(""); // Limpa a mensagem de erro em caso de sucesso
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setErrorMessage("Falha no login. Verifique suas credenciais."); // Define a mensagem de erro
    }
  };

  const handleContinueSemLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Login</Text>

          {/* Exibe a mensagem de erro se existir */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => console.log("Esqueci a senha")}
          >
            <Text style={styles.linkText}>Esqueci a senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueWithoutLoginButton}
            onPress={handleContinueSemLogin}
          >
            <Text style={styles.continueWithoutLoginText}>
              Continue sem login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
