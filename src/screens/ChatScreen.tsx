import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getDatabase, off, onValue, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { Header } from "../components/header";
import { HorizontalMenu } from "../components/menu";
import { useAuth } from "../hooks/useAuth";
import { RootStackParamList } from "../navigation/AppNavigator";
import styles from "../styles/ChatScreenStyles";
import globalStyles from "../styles/globalStyles";

const firebaseConfig = {
  apiKey: "AIzaSyBmH__NnQBHzXIVNzx0AjpqH6SOg_zjW0g",
  authDomain: "boratrocar-7e01f.firebaseapp.com",
  databaseURL: "https://boratrocar-7e01f-default-rtdb.firebaseio.com",
  projectId: "boratrocar-7e01f",
  storageBucket: "boratrocar-7e01f.appspot.com",
  messagingSenderId: "254748397046",
  appId: "1:254748397046:android:2eff7e364002f06d384bd7",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tipos de navegação
type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;
type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Chat"
>;

// Definindo o tipo Message
type Message = {
  text: string;
  timestamp: number;
  bookId: string;
  ownerUserId: string;
  senderUserId: string; // Novo campo para identificar o remetente
};

type Props = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};

export function ChatScreen({ route }: Props) {
  const { bookId, ownerUserId } = route.params || {
    bookId: "",
    ownerUserId: "",
  };

  const { usuario } = useAuth(); // Usando o hook de autenticação para obter o usuário logado
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  //mano tem q usar hook para fazer um treco tosco kkkkkkkkk
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Identificador único do chat entre o dono do livro e o usuário logado
  const chatId = `${bookId}_${ownerUserId}_${usuario?.nomeCompleto}`;

  useEffect(() => {
    if (!usuario?.nomeCompleto) return;

    const chatRef = ref(database, `chats/${chatId}/messages`); // Usando a referência específica do chat

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data).map((msg: any) => ({
          text: msg.text,
          timestamp: msg.timestamp,
          bookId: msg.bookId,
          ownerUserId: msg.ownerUserId,
          senderUserId: msg.senderUserId, // Adicionando o remetente
        }));
        setMessages(messageList);
      } else {
        setMessages([]); // Limpar mensagens se não houver dados
      }
    });

    return () => {
      off(chatRef);
    };
  }, [chatId, usuario?.nomeCompleto]);

  const handleSend = () => {
    if (message.trim() && usuario?.nomeCompleto) {
      const chatRef = ref(database, `chats/${chatId}/messages`);
      push(chatRef, {
        text: message,
        timestamp: Date.now(),
        bookId,
        ownerUserId,
        senderUserId: usuario.nomeCompleto, // Definindo o remetente como o usuário logado
      });
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Card key={index} style={styles.messageCard}>
              <Card.Content>
                <Text
                  style={styles.txtMsgTitle}
                >{`Usuário: ${msg.senderUserId}, Livro ID: ${msg.bookId}`}</Text>
                <Text style={styles.txtMsg}>{msg.text}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noMessagesText}>Nenhuma mensagem ainda.</Text>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Digite sua mensagem..."
          value={message}
          onChangeText={setMessage}
          onFocus={handleFocus} // Define o estado quando o campo está em foco
          onBlur={handleBlur} // Define o estado quando o foco é perdido
          style={[
            styles.textInput,
            isFocused && styles.textInputFocused, // Aplica o estilo quando em foco
          ]}
        />
        <Button
          mode="contained"
          icon={() => <Ionicons name="send" size={24} color="white" />}
          onPress={handleSend}
          style={styles.sendButton}
        >
          {null}
        </Button>
      </View>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}
