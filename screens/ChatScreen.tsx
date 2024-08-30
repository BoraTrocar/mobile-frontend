import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, TextInput, Text, Card } from "react-native-paper";
import { HorizontalMenu } from "../components/menu";
import globalStyles from "../styles/globalStyles";

export function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      {/*   <Appbar.Header>
        <Appbar.Content title="Chat" />
      </Appbar.Header> */}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Card key={index} style={styles.messageCard}>
              <Card.Content>
                <Text>{msg}</Text>
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
          style={styles.textInput}
        />
        <Button
          mode="contained"
          icon={() => <Ionicons name="send" size={24} color="white" />}
          onPress={handleSend}
          style={styles.sendButton}
        >
          {null} {/* Acho que isso aqui é gambiarra */}
        </Button>
      </View>

      <View style={globalStyles.fixedMenu}>
        <HorizontalMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 10,
  },
  messageCard: {
    marginBottom: 8,
  },
  noMessagesText: {
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginBottom: "15%",
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },

  //ESTA MERDA DE REACT NATIVE É UM LIXO E NAO DA PARA FAZER UMA CARALHA DE BOTAO DIREITO
  sendButton: {
    backgroundColor: "#4eb3de",

    height: 40,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
