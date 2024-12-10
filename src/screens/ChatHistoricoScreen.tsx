import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  DataSnapshot,
  getDatabase,
  off,
  onValue,
  ref,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { Header } from "../components/header";
import { HorizontalMenu } from "../components/menu";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "../navigation/AppNavigator";
import styles from "../styles/ChatHistoricoScreen";
import globalStyles from "../styles/globalStyles";

type ChatHistoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChatHistorico"
>;

type ChatPreview = {
  chatId: string;
  bookId: string;
  ownerUserId: string;
  lastMessage: string;
  timestamp: number;
};

export function ChatHistorico() {
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true); // Estado para o loading
  const { usuario } = useAuth();
  const navigation = useNavigation<ChatHistoryScreenNavigationProp>();

  useEffect(() => {
    if (!usuario?.nomeCompleto) return;

    const db = getDatabase();
    const chatsRef = ref(db, "chats");

    const listener = onValue(chatsRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const previews: ChatPreview[] = [];
        Object.entries(data).forEach(([chatId, chatData]: [string, any]) => {
          const messages = chatData.messages;
          if (messages) {
            const lastMessageKey = Object.keys(messages).pop();
            if (lastMessageKey) {
              const lastMessage = messages[lastMessageKey];
              if (
                lastMessage.senderUserId === usuario.nomeCompleto ||
                lastMessage.ownerUserId === usuario.nomeCompleto
              ) {
                previews.push({
                  chatId,
                  bookId: lastMessage.bookId,
                  ownerUserId: lastMessage.ownerUserId,
                  lastMessage: lastMessage.text,
                  timestamp: lastMessage.timestamp,
                });
              }
            }
          }
        });
        setChatPreviews(previews.sort((a, b) => b.timestamp - a.timestamp));
      }
      setLoading(false); // Carregamento concluído
    });

    return () => off(chatsRef);
  }, [usuario?.nomeCompleto]);

  const renderChatPreview = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chat", {
          bookId: item.bookId,
          ownerUserId: item.ownerUserId,
        })
      }
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Livro ID: {item.bookId}</Text>
          <Text style={styles.msg}>{item.lastMessage}</Text>
          <Text style={styles.data}>{new Date(item.timestamp).toLocaleString()}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6200ee"
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={chatPreviews}
          renderItem={renderChatPreview}
          keyExtractor={(item) => item.chatId}
        />
      )}
      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
