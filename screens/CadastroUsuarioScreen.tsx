import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "../navigation/AppNavigator";
import styles from "../styles/CadastroUsuarioScreenStyles";

type CadastroUsuarioScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function CadastroUsuarioScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<CadastroUsuarioScreenNavigationProp>();

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
