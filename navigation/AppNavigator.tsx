import LoginScreen from "@/screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LivroProps } from "../models/LivroProps";
import { ChatScreen } from "../screens/ChatScreen";
import { DetalhesDoLivroScreen } from "../screens/DetalhesDoLivroScreen";
import { EventoScreen } from "../screens/EventoScreen";
import HomeScreen from "../screens/HomeScreen";
import { PerfilScreen } from "../screens/PerfilScreen";
import CadastroUsuarioScreen from "@/screens/CadastroUsuarioScreen";

export type RootStackParamList = {
  Home: undefined;
  DetalhesDoLivroScreen: { livro: LivroProps };
  Chat: undefined;
  Perfil: undefined;
  Evento: undefined;
  Login: undefined;
  CadastroUsuario: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetalhesDoLivroScreen"
        component={DetalhesDoLivroScreen}
        options={{
          title: "Detalhes do Livro",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: "Perfil",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Evento"
        component={EventoScreen}
        options={{
          title: "Evento",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuarioScreen}
        options={{
          title: "CadastroUsuario",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
