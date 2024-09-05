import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "../navigation/AppNavigator";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function SignUpScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const handleSignUpPress = () => {
    console.log("FOIIIIII");
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Cadastro</Text>

          <TextInput style={styles.input} placeholder="Nome" />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput style={styles.input} placeholder="Nickname" />

          <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

          <TextInput style={styles.input} placeholder="Data de Nascimento" />

          <TextInput
            style={styles.input}
            placeholder="CEP"
            keyboardType="numeric"
          />

          <TextInput style={styles.input} placeholder="Cidade" />

          <TextInput style={styles.input} placeholder="UF" />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: Constants.statusBarHeight + 20,
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#2196F3",
    fontSize: 16,
  },
  fixedMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
