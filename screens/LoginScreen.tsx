import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
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
import styles from "../styles/LoginScreenStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    console.log("Apertou o login esta bagaça");
    navigation.navigate("CadastroUsuario");
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

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

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
