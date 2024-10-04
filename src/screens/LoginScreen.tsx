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
import { removeToken, setToken } from "../token/tokenStorage"; // Importa a função para salvar o token
import { useAuth } from "../hooks/useAuth";
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
  //onAuthStateChanged,
} from "firebase/auth";
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from "react-native-fbsdk-next";
import {app} from "../../firebaseConfig"

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function LoginScreen() {

  //Depois tem q coponetizar esta bagaça aqui
  const SignInWithFB = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        throw new Error('User cancelled login');
      }
  
      // Get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
  
      // Create a Firebase credential with the AccessToken
      const auth = getAuth(app);
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
  
      // Sign-in the user with the credential
      const userCredential = await signInWithCredential(auth, facebookCredential);
      console.log('User signed in:', userCredential.user);
  
      // You can now use userCredential.user to access the signed-in user's information
      
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };

  const { colors } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  const { isAutenticado } = useAuth();

  const usuarioService = new UsuarioService();

  const handleLogin = async () => {
    try {
      const usuario = { email, senha };
      const token = await usuarioService.loginUsuario(usuario); // Obtém o token
      await setToken(token); // Salva o token no AsyncStorage
      console.log("Login realizado com sucesso");
      setErrorMessage(""); // Limpa a mensagem de erro em caso de sucesso
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setErrorMessage("Falha no login. Verifique suas credenciais."); // Define a mensagem de erro
    }
  };

  const handleContinueSemLogin = () => {
    if (isAutenticado) {
      removeToken();
      navigation.navigate("Home");
    }
    navigation.navigate("Home");
  };

  const handleCadastroUsuario = () => {
    navigation.navigate("CadastroUsuario");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleCadastroUsuario}
          >
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

          {/* caralho de login social */}
          <TouchableOpacity
            style={styles.continueWithoutLoginButton}
            onPress={SignInWithFB}
          >
            <Text style={styles.continueWithoutLoginText}>
              Continue com o Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
