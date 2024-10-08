import { RootStackParamList } from "@/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "inicio", label: "Início", icon: "home" },
  { id: "perfil", label: "Perfil", icon: "account" },
  { id: "chat", label: "Chat", icon: "chat" },
  { id: "evento", label: "Evento", icon: "calendar" },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HorizontalMenu() {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = (id: string) => {
    switch (id) {
      case "inicio":
        navigation.navigate("Home");
        break;
      case "chat":
        navigation.navigate("Chat");
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
