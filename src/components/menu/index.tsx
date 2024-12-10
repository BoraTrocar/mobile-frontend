import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, FlatList, View, ActivityIndicator } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useAuth } from "../../hooks/useAuth";

const screenWidth = Dimensions.get("window").width;

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "inicio", label: "Início", icon: "home" },
  { id: "perfil", label: "Perfil", icon: "account" },
  { id: "chatHistorico", label: "Chat", icon: "chat" },
  { id: "evento", label: "Evento", icon: "calendar" },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HorizontalMenu() {
  const navigation = useNavigation<NavigationProp>();
  const { isAutenticado, isCarregando } = useAuth();

  const handlePress = (id: string) => {
    if (id === "perfil" && !isAutenticado) {
      navigation.navigate("Login");
    } else {
      switch (id) {
        case "inicio":
          navigation.navigate("Home");
          break;
        case "chatHistorico":
          navigation.navigate("ChatHistorico");
          break;
        case "perfil":
          navigation.navigate("Perfil");
          break;
        case "evento":
          navigation.navigate("Evento");
          break;
        default:
          console.log(`Navegação não configurada para o item: ${id}`);
      }
    }
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={{ marginHorizontal: 4, alignItems: "center" }}>
      <IconButton
        icon={item.icon}
        size={28}
        onPress={() => handlePress(item.id)}
        iconColor="white"
        style={{ margin: 0 }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: "bold",
          marginTop: -8,
          color: "white",
        }}
      >
        {item.label}
      </Text>
    </View>
  );

  if (isCarregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3895CA" />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#3895CA",
        height: 60,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      }}
    >
      <FlatList<MenuItem>
        data={MENU_ITEMS}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-around",
          width: screenWidth,
        }}
      />
    </View>
  );
}
